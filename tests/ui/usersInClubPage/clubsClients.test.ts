import test from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";

test.describe("Тесты на функционал клиенты в клубе", async () => {
    test("Успешный переход на страницу клиенты в клубе", async ({page}) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
            await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
            await page.getByRole('button', { name: 'Войти' }).click();
        });
        await test.step("Перейти на страницу клиенты в клубе", async () => {
            await page.getByText('Клиенты в клубе').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Клиенты в клубе", async () => {
            await page.waitForURL("https://crm.test.ddxfitness.ru/clients-in-club");  
        });    
    });
});