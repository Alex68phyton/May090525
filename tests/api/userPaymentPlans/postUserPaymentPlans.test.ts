import { expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import UserPaymentPlansRequests from "@requests/userPaymentPlans.request";
import { getUserRequestJson } from "@entities/users/user.requestJson";
import { getUserPaymentPlanRequestJson } from "@entities/userPaymentPlan.requestJson";
import { baseResponseJsonSchema } from "@entities/base.response";
import { validateJson } from "@utils/validator.util";
import { clubDataResponseJsonSchema, createUserPaymentPlanDataResponseJsonSchema, paymentPlanDataResponseJsonSchema } from "@entities/userPaymentPlan.response";



test.describe("API-тесты на создание подписки юзера", async () => {
    test("[positive] создание подписки юзеру", async ({request}) => {
            const clubId = await test.step("Получить id клуба", async () => {
                        const parameters = {...await getBaseParameters()};
                        const getClubResponse = await new ClubsRequests(request).getClubs(200, parameters);
                        const getClubsData = await getClubResponse.json();
                        return getClubsData?.data[0]?.id;
                    });
            
            const userId = await test.step("Получить id клиента", async () => {     
                const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
                const response = (await (await new UsersRequests(request).postUsers(200, requestBody)).json()).data;
                return response.id
            });

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