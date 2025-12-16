import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import UserPaymentPlansRequests from "@requests/userPaymentPlans.request";
import { getUserRequestJson } from "@entities/users/user.requestJson";
import { getUserPaymentPlanRequestJson } from "@entities/userPaymentPlan.requestJson";
import { baseResponseJsonSchema } from "@entities/base.response";
import { validateJson } from "@utils/validator.util";
import { getEditUserPaymentPlanRequestJson } from "@entities/userPaymentPlanEdit.requestJson";
import UserPaymentPlanEditRequests from "@requests/userPaymentPlanEditRequest";
import { userPaymentPlanEditDataResponseJsonSchema } from "@entities/userPaymentPlanEdit.response";
import { selectUserPaymentPlanById } from "db/userPaymentPlans.db";



test.describe("API-тесты на редактирование подписки юзера", async () => {
    test("[positive] редактирование статуса подписки", async ({request}) => {
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

        const createUppResponse = await test.step("Создать подписку юзеру", async () => { 
            const requestBody = await getUserPaymentPlanRequestJson(clubId);

            const getUserPaymentPlanResponse = (await (await new UserPaymentPlansRequests(request).postUserPaymentPlans(200, requestBody, userId)).json());
            console.log(getUserPaymentPlanResponse);
            return getUserPaymentPlanResponse;       
        });

        const response = await test.step("Отредактировать подписку юзеру", async () => { 
            const requestBody = await getEditUserPaymentPlanRequestJson(createUppResponse.data[0].id, createUppResponse.data[0].status);
            console.log(requestBody);
            console.log(createUppResponse.data[0].id);
            console.log(createUppResponse.data[0].status);

            const getUserPaymentPlanEditResponse = (await (await new UserPaymentPlanEditRequests(request).postUserPaymentPlanEdit(200, requestBody)).json());
            return getUserPaymentPlanEditResponse;       
        });

        await test.step("Проверить схему ответа", async () => {
            await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
            await expect(validateJson(userPaymentPlanEditDataResponseJsonSchema, response.data[0])).resolves.toBeTruthy();
        });

        const statusInDb = await test.step("получить id юзера, у которого есть транзакции", async () => {
            const uppId = Number(createUppResponse.data[0].id);
            return await selectUserPaymentPlanById(uppId);
        });

        await test.step("Проверка статуса", async () => {
        expect(statusInDb.status).toEqual(createUppResponse.data[0].status);
        });
            
    });
         
});