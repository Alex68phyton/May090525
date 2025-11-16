import test from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";
import LoginPage from "pages/login.page";

test.describe("Тесты на функционал клиенты в клубе", async () => {
    test("Успешный переход на страницу клиенты в клубе", async ({page}) => {
        const loginPage = new LoginPage();
        
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Перейти на страницу клиенты в клубе", async () => {
            await page.getByText('Клиенты в клубе').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Клиенты в клубе", async () => {
            await page.waitForURL("https://crm.test.ddxfitness.ru/clients-in-club");  
        });    
    });
});