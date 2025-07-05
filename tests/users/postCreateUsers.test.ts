import { expect, request, test } from "@playwright/test";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import { Statuses } from "@libs/statuses";
import {  RequestSources } from "@libs/requestSources";
import userTestData from "@data/user.json";
import requestTestData from "@data/request.json";
import { SportExpirience } from "@libs/sportExpirience";
import { getBaseParameters } from "@entities/baseParameters";

const sportExperience = [
    SportExpirience.ZERO_SIX_MONTH,
    SportExpirience.SIX_TWELVE_MONTH,
    SportExpirience.ONE_TWO_YEARS
]
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
            const requestBody = {
                session_id: requestTestData.sessionId,
                request_id: requestTestData.requestId,
                request_source: RequestSources.CRM,
                data: {
                    email: getRandomEmail(),
                    name: userTestData.first_name,
                    last_name: userTestData.last_name,
                    middle_name: userTestData.middle_name,
                    sex: userTestData.sex.male,
                    phone: getRandomPhoneNumber(),
                    birthday: userTestData.birthday,
                    password: userTestData.password,
                    lang: userTestData.lang.ru,
                    home_club_id: clubId,
                    club_access: false,
                    admin_panel_access: true,
                    group_training_registration_access: false,
                    sport_experience: SportExpirience.ZERO_SIX_MONTH
                }
            };
            return (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json()).data;
        });
    });

sportExperience.forEach(experience => {
    test(`[positive] создание клиента без пароля с опытом ${experience}`, async ({request}) => {
        const response = await test.step("Создать клиента", async () => {     
            const requestBody = {
                session_id: requestTestData.sessionId,
                request_id: requestTestData.requestId,
                request_source: RequestSources.CRM,
                data: {
                    email: getRandomEmail(),
                    name: userTestData.first_name,
                    last_name: userTestData.last_name,
                    middle_name: userTestData.middle_name,
                    sex: userTestData.sex.male,
                    phone: getRandomPhoneNumber(),
                    birthday: userTestData.birthday,
                    password: userTestData.password,
                    lang: userTestData.lang.ru,
                    home_club_id: clubId,
                    club_access: false,
                    admin_panel_access: true,
                    group_training_registration_access: false,
                    sport_experience: SportExpirience.ZERO_SIX_MONTH
                }
            };
            return (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json()).data;
        });
    });
});
});