import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import UsersRequests from "@requests/users.request";
import VerifyRequest from "@requests/verify.requests";
import { getUserRequestJson } from "@entities/users/user.requestJson";
import test, { expect } from "../baseApiTest.fixture";



test.describe("API-тесты на получение юзера", async () => {
    test("[positive] получение юзера по id", async ({request, userId, userPhone}) => {
        
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