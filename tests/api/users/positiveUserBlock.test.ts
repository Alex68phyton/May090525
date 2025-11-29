import { APIRequestContext, expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import UserBlockRequests from "@requests/userBlock.request";
import { Statuses } from "@libs/statuses";
import { getUserRequestJson } from "@entities/users/user.requestJson";
import { getUserBlockRequestJson } from "@entities/users/userBlock.requestJson";
import { validateJson } from "@utils/validator.util";
import { baseResponseJsonSchema } from "@entities/base.response";
import { userBlockDataJsonSchema } from "@entities/users/userBlock.response";



test.describe("API-тесты на поиск клиента", async () => {
    test("Заблокировать клиента", async({request}) => {
        const clubId = await test.step("Получить id клуба", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const userId = await test.step("Получить id клиента", async () => {     
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
            return (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json()).data.id;
        });
        const response = await test.step("Заблокировать клиента", async () => {
            const requestBody = await getUserBlockRequestJson();
            return (await (await new UserBlockRequests(request).postUserBlock(Statuses.OK, requestBody, userId)).json());
        });
        await test.step("Проверить схему ответа", async () => {
                    await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
                    await expect(validateJson(userBlockDataJsonSchema, response.data)).resolves.toBeTruthy();
                })
        await test.step("Проверить тип заметки заблокированного клиента", async () => {
            expect(response.data.notes.type).toEqual("block");
        });                
    });
});