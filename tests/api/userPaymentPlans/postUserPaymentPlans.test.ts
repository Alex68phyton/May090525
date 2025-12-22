import test, { expect } from "../baseApiTest.fixture";
import UserPaymentPlansRequests from "@requests/userPaymentPlans.request";
import { getUserPaymentPlanRequestJson } from "@entities/userPaymentPlan.requestJson";
import { baseResponseJsonSchema } from "@entities/base.response";
import { validateJson } from "@utils/validator.util";
import { clubDataResponseJsonSchema, createUserPaymentPlanDataResponseJsonSchema, paymentPlanDataResponseJsonSchema } from "@entities/userPaymentPlan.response";



test.describe("API-тесты на создание подписки юзера", async () => {
    test("[positive] создание подписки юзеру", async ({request, clubId, userId}) => {

            const response = await test.step("Создать подписку юзеру", async () => { 
                const requestBody = await getUserPaymentPlanRequestJson(clubId);

            const getUserPaymentPlanResponse = (await (await new UserPaymentPlansRequests(request).postUserPaymentPlans(200, requestBody, userId)).json());
            return getUserPaymentPlanResponse;       
            });

            await test.step("Проверить схему ответа", async () => {
                await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
                await expect(validateJson(createUserPaymentPlanDataResponseJsonSchema, response.data[0])).resolves.toBeTruthy();
                await expect(validateJson(paymentPlanDataResponseJsonSchema, response.data[0].payment_plan)).resolves.toBeTruthy();
                await expect(validateJson(clubDataResponseJsonSchema, response.data[0].club)).resolves.toBeTruthy();
            });

            await test.step("Проверка статуса", async () => {
            expect(response.data[0].status).toEqual("Created");
        })
            
    });
         
});