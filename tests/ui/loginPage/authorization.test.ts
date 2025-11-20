import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";

test.describe("Тесты на авторизацию в CRM", async () => {
    test("Успешная авторизация в CRM", async ({page, loginPage}) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Проверить, что пользователь находится в CRM и видит поле поиска", async () => {
            await page.locator("//input[@data-testid='phone-input']").waitFor({state: 'visible', timeout: 3000});  
        });    
    });
});