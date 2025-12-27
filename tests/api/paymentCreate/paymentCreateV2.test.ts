import { Statuses } from "libs/statuses";
import { PaymentServices } from "libs/paymentServices";
import test, { expect } from "../baseApiTest.fixture";
import UserPaymentPlansV2Requests from "@requests/userPaymentPlansV2.request";
import { getUserPaymentPlanRequestJson } from "@entities/userPaymentPlanV2.requestJson";
import { getPaymentCreateV2RequestJson } from "@entities/paymentCreateV2.requestJson";
import UserPaymentCreateV2Requests from "@requests/paymentCreateV2.request";
import { validateJson } from "@utils/validator.util";
import { baseResponseJsonSchema } from "@entities/base.response";
import { paymentCreateV2RequestJsonSchema } from "@entities/paymentCreateV2.response";

test.describe("API-тесты на оплату подписки", async () => {
    let userPaymentPlanFirstId: number;
    let userPaymentPlanSecondId: number;
    test.beforeEach(async ({request, clubId, userId}) => {
                [userPaymentPlanFirstId, userPaymentPlanSecondId] = await test.step("Создать подписку юзеру и получить id", async () => {
            const uppV2RequestBody = await getUserPaymentPlanRequestJson(clubId); 

            const getUserPaymentPlanV2Response = (await (await new UserPaymentPlansV2Requests(request).postUserPaymentPlansV2(Statuses.OK, uppV2RequestBody, userId)).json()).data[0];
            return [getUserPaymentPlanV2Response.parent_id, getUserPaymentPlanV2Response.id]      
        });
    });
    const paymentService = [PaymentServices.CLOUDPAYMENTS, PaymentServices.NEW_SBER, PaymentServices.PAYGINE]
    paymentService.forEach(payment_service => {
        test.only(`[positive] создание транзакции первичной оплаты подписки провайдером ${payment_service}`, async ({request, userId}) => {
            const paymentCreateResponse = await test.step("Создание платежной транзакции первичной оплаты подписки", async () => {
                const paymentCreateV2Body = await getPaymentCreateV2RequestJson(userId, userPaymentPlanFirstId, payment_service, userPaymentPlanSecondId);
                const paymentCreateV2Response = (await (await new UserPaymentCreateV2Requests(request).postUserPaymentCreateV2(Statuses.OK, paymentCreateV2Body)).json());
                return paymentCreateV2Response;
            });

            await test.step("Проверить схему ответа", async () => {
                await expect(validateJson(baseResponseJsonSchema, paymentCreateResponse)).resolves.toBeTruthy();
                await expect(validateJson(paymentCreateV2RequestJsonSchema, paymentCreateResponse.data[0])).resolves.toBeTruthy();
            });
            await test.step("Проверить статус транзакции", async () => {
                expect(paymentCreateResponse.data[0].transactions[0].status).toEqual("in progress");
            });                
        });
    });
});