import test from "../baseTest";
import authCRMTestData from "@data/authCRM.json";

test.describe("Тесты на функционал клиенты в клубе", async () => {
    test("Успешный переход на страницу клиенты в клубе", async ({ page, loginPage }) => {
        
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Перейти на страницу клиенты в клубе", async () => {
            await page.getByText('Клиенты в клубе').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Клиенты в клубе", async () => {
            await page.waitForURL("clients-in-club");  
        });    
    });
});