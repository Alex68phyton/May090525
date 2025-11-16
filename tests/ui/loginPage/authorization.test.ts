import test from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";
import LoginPage from "pages/login.page";

test.describe("Тесты на авторизацию в CRM", async () => {
    test("Успешная авторизация в CRM", async ({page}) => {
        const loginPage = new LoginPage();
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Проверить, что пользователь находится в CRM и видит поле поиска", async () => {
            await page.locator("//input[@data-testid='phone-input']").waitFor({state: 'visible', timeout: 3000});  
        });    
    });
});