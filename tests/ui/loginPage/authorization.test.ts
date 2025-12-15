import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";

test.describe("Тесты на авторизацию в CRM", async () => {
    test("Успешная авторизация в CRM", async ({page, loginPage, headerBlock}) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
        });
        await test.step("Проверить верстку страницы", async () => {
            await expect(page).toHaveScreenshot("authPage.png", {
              fullPage: true,
              maxDiffPixelRatio: 0.02,
              mask: [
                loginPage.selector(page).authForm.loginInput,
                loginPage.selector(page).authForm.passwordInput
              ]  
            });
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Проверить, что пользователь находится в CRM и видит поле поиска", async () => {
            await headerBlock.selector(page).search.searchInput.waitFor({state: 'visible', timeout: 3000});  
        });    
    });

    test("Успешная авторизация в CRM(проверить что пользователь авторизован в новой вкладке", async ({page, loginPage, headerBlock}) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Проверить, что пользователь находится в CRM и видит поле поиска", async () => {
            await headerBlock.selector(page).search.searchInput.waitFor({state: 'visible', timeout: 3000});  
        });
        await test.step("Открыть новую вкладку, зайти в CRM и убедиться, что пользователь авторизован", async () => {
            const newPage = await page.context().newPage();
            await newPage.goto("");
            await headerBlock.selector(newPage).search.searchInput.waitFor({state: 'visible', timeout: 3000});
        });    
    });
});