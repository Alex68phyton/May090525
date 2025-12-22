import { getBaseParameters } from "@entities/baseParameters";
import UsersRequests from "@requests/users.request";
import test, { expect } from "../baseApiTest.fixture";



test.describe("API-тесты на получение юзера", async () => {
    test("[positive] получение юзера по id", async ({request, userId}) => {

            const response = await test.step("Получить информацию о клиенте", async () => { 
                const parameters = {...await getBaseParameters()};
                const getUserResponse = await new UsersRequests(request).getUserById(200, parameters, userId);
                const getUserData = await getUserResponse.json();
                return getUserData?.data.id;       
            })

            await test.step("Проверки", async () => {
            expect(response).toEqual(userId);
        })
            
    });
         
});