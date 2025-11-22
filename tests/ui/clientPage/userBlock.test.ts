import test, { expect } from "../baseTest";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import { Statuses } from "@libs/statuses";
import { getBaseParameters } from "@entities/baseParameters";
import { getUserRequestJson, UserDataRequestJson } from "@entities/users/user.requestJson";
import authCRMTestData from "@data/authCRM.json";


test.describe("Тесты на блокировку/разблокировку клиента", async () => {
    test.only("Тест на блокировку клиента", async ( {request, page, loginPage, clientPage, headerBlock }) => {
        const clubId = await test.step("Получить id клуба", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const userId = await test.step("Создать клиента", async () => {     
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
            const response = await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json();
            return response.data.id;
        });

        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });

        await test.step("Проверить, что пользователь находится в CRM и видит поле поиска", async () => {
            await headerBlock.selector(page).search.searchInput.waitFor({state: 'visible', timeout: 3000});  
        });

        await test.step("Перейти на страницу юзера", async() => {
            await page.goto(clientPage.getPath(userId));
        });

        await test.step("Заблокировать юзера", async() => {
            await clientPage.userBlock(page);
        });

        await test.step("Проверить, что юзер заблокирован", async() => {
            await clientPage.selector(page).button.unblockButton.waitFor({state: 'visible', timeout: 3000});
        });
    });
});