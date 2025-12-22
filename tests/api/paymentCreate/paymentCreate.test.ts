import { APIRequestContext } from "@playwright/test";
import UserPaymentPlansRequests from "@requests/userPaymentPlans.request";
import { getCurrentSplitDate } from "@utils/getAnyDate";
import { Statuses } from "libs/statuses";
import { PaymentServices } from "libs/paymentServices";
import UserPaymentCreateRequests from "@requests/paymentCreate.requests";
import test, { expect } from "../baseApiTest.fixture";

test.describe("API-тесты на оплату подписки", async () => {
    let userPaymentPlanId: number;
    const paymentCreateResponse = async (request: APIRequestContext, status: Statuses, providerId: number, paymentServicesId: PaymentServices, userId: number) => {
        const requestBody = {
                     session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                     request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d99",
                     request_source: "crm",
                     provider_id: providerId,
                     type: "payment",
                     gate_id: 3,
                     user_id: userId,
                     user_payment_plan_id: userPaymentPlanId,
                     currency: "RUB",
                     payment_service_id: paymentServicesId,
                     employee_id: 2549,
                     fiscal_method: "OrangeData",
                     widget_settings: {
                         success_page: "https://site-pretest.ddxfitness.ru/checkout/redirect.php",
                         fault_page: "https://site-pretest.ddxfitness.ru/checkout/redirect.php?error=faild"
                    }
        }

        const paymentCreateResponse = (await (await new UserPaymentCreateRequests(request).postUserPaymentCreate(status, requestBody)).json());
        
        return paymentCreateResponse;
    }
    test.beforeEach(async ({request, clubId, userId}) => {

        userPaymentPlanId = await test.step("Создать подписку юзеру и получить id", async () => { 
            const requestBody = {
                    session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                    request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                    request_source: "crm",
                    start_date: getCurrentSplitDate(),
                    payment_plan_id: 18,
                    club_id: clubId,
                    verification_token: "e3767699-6a16-4da1-94b9-fa8ab9378fb4",
                    discount_id: 199
                };

        const getUserPaymentPlanResponse = (await (await new UserPaymentPlansRequests(request).postUserPaymentPlans(Statuses.OK, requestBody, userId)).json()).data[0];
        return getUserPaymentPlanResponse.id;       
        });

    });
    const paymentService = [PaymentServices.CLOUDPAYMENTS, PaymentServices.NEW_SBER, PaymentServices.PAYGINE]
    paymentService.forEach(payment_service => {
        test(`[positive] создание транзакции первичной оплаты подписки провайдером ${payment_service}`, async ({request, userId}) => {
                const paymentCreateSuccessResponse = await test.step("Создание платежной транзакции первичной оплаты подписки", 
                async () => paymentCreateResponse(request, Statuses.OK, 6, payment_service, userId));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(paymentCreateSuccessResponse.transaction.status).toEqual("in progress");
            });
                
        });
    });
        test("[negative] недопустимое значение провайдера оплаты", async ({request, userId}) => {
                const paymentCreateErrorResponse = await test.step("Отправка оплаты с не существующим провайдером",
                async () => paymentCreateResponse(request, Statuses.BAD_REQUEST, 777, PaymentServices.CLOUDPAYMENTS, userId));

                await test.step("Проверить сообщение об ошибке", async () => {
                    expect(paymentCreateErrorResponse.error.message).toEqual("not payment provider");
            });
                
        });
         
});