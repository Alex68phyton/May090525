import { expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import VerifyRequest from "@requests/verify.requests";
import { getUserRequestJson } from "@entities/user.requestJson";



test.describe("API-тесты на получение юзера", async () => {
    test("[positive] получение юзера по id", async ({request}) => {
        const clubId = await test.step("Получить id клуба", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(200, parameters);
            const getClubsData = await getClubResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const { userId, userPhone } = await test.step("Получить id клиента", async () => {     
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
            const response = (await (await new UsersRequests(request).postUsers(200, requestBody)).json()).data;
            return {
                userId: response.id,
                userPhone: response.phone
            }
        });
        
        const response = await test.step("Отправить код верификации клиенту", async () => {
            const requestBody = {
                session_id: "getcodetests",
                request_id: "getcodetest",
                request_source: "crm",
                data: {
                    message_type: "sms",
                    contact: userPhone,
                    template: "mail_signing_an_agreement",
                    user_id: userId
                }
            }

            const response = await new VerifyRequest(request).postGetCode(200, requestBody);

            return response.json();
        });

        await test.step("Проверки", async () => {
            expect(response.status).toEqual('OK');
        })
    });
});