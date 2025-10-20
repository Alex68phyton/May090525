import { expect, request, test } from "@playwright/test";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import { Statuses } from "@libs/statuses";
import { SportExpirience } from "@libs/sportExpirience";
import { getBaseParameters } from "@entities/baseParameters";
import { getUserRequestJson, UserDataRequestJson } from "@entities/users/user.requestJson";
import { validateJson } from "@utils/validator.util";
import { baseResponseJsonSchema } from "@entities/base.response";
import { createUserDataResponseJsonSchema } from "@entities/users/user.response";


let clubId: number;

test.describe("API-тесты на создание клиентов", async () => {
    test.beforeAll( async({request}) => {
        clubId = await test.step("Получить id клуба", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubResponse.json();
            return getClubsData?.data[0]?.id;
        });
    });
    test("Создать клиента", async ( {request}) => {
        const response = await test.step("Создать клиента", async () => {     
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
            return (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json());
        });

        await test.step("Проверить схему ответа", async () => {
            await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
            await expect(validateJson(createUserDataResponseJsonSchema, response.data)).resolves.toBeTruthy();
        });
    });

Object.values(SportExpirience).forEach(experience => {
    test(`[positive] создание клиента без пароля с опытом ${experience}`, async ({request}) => {
        const response = await test.step("Создать клиента", async () => {     
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
            (requestBody.data as UserDataRequestJson).sport_experience = experience;
            (requestBody.data as UserDataRequestJson).password = "";

            return (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json());
        });

        await test.step("Проверить схему ответа", async () => {
            await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
            await expect(validateJson(createUserDataResponseJsonSchema, response.data)).resolves.toBeTruthy();
        })
    });
});
});