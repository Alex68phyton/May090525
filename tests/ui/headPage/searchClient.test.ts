import { expect, test } from "@playwright/test";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import { Statuses } from "@libs/statuses";
import { getBaseParameters } from "@entities/baseParameters";
import { getUserRequestJson } from "@entities/users/user.requestJson";
import api from '../../../api.json';
import authCRMTestData from "@data/authCRM.json";
import LoginPage from "pages/login.page";
import HeaderBlock from "pages/blocks/header.block";

test.describe("Тесты на поиск клиента в CRM", async () => {
    test("Поиск юзера по номеру телефона", async ({request, page}) => {
        const loginPage = new LoginPage();
        const headerBlock = new HeaderBlock();
        const phoneNumber = await test.step("Создать номер телефона клиента", () => getRandomPhoneNumber());

        const clubId = await test.step("Получить id клуба", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubResponse.json();
            return getClubsData?.data[0]?.id;
        });
        
        const userId = await test.step("Создать клиента", async() => {
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), phoneNumber);
            const response = await new UsersRequests(request).postUsers(Statuses.OK, requestBody);
            return (await response.json()).data.id;
        });

        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });

        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });

        await test.step("Ввести номер телефона в поиске и перейти на страницу клиента", async () => {
            await headerBlock.selector(page).search.searchInput.waitFor({state: 'visible', timeout: 3000});
            await headerBlock.selector(page).search.searchInput.fill(phoneNumber);
            await headerBlock.selector(page).search.searchButton.click();
            await headerBlock.selector(page).clientInfo.openButton.click();
        });

        await test.step("Проверить, что был выполнен переход на страницу клиента", async () => {
            await page.getByTestId('client-phone').waitFor({state: 'visible', timeout: 3000});
            expect (await page.url()).toContain(String(userId));
        });
        await test.step("Проверить, что фамилия и имя отображаются корректно", async () => {
            await expect(page.getByTestId('client-full-name')).toHaveText('Квак Кваква');
        });
    });
});