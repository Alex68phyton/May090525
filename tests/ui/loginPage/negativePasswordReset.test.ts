import test from "@playwright/test";
import api from "../../../api.json";
import LoginPage from "pages/login.page";
import authCRMTestData from "@data/authCRM.json";

test.describe("Негативные тесты на сброс пароля", async () => {
    test("Ввод несуществующего email на странице сброса пароля", async ({page}) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Нажать не помню пароль", async () => {
            await page.getByText('Не помню пароль').click();
        });
        await test.step("Ввести несуществующий email", async () => {
            await page.getByPlaceholder('Введите ваш e-mail').fill('abrokadabra');
        });
        await test.step("Нажать Сбросить пароль", async () => {
            await page.getByRole('button', { name: 'Сбросить пароль' }).click();  
        });
        await test.step("Проверить, что пользователь видит сообщение о некорректно введенном email", async () => {
            await page.getByText('Введён некорректный email').waitFor({state: 'visible', timeout: 3000});;  
        });    
    });
    test("Ввод несуществующих логина и пароля на странице авторизации", async( {page} ) => {
        const loginPage = new LoginPage();

        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.incorrect_login, authCRMTestData.incorrect_password);
        });
        await test.step("Проверить, что пользователь видит ошибку ввода логина и пароля", async () => {
            await page.getByText('Неверный логин или пароль').waitFor({state: 'visible', timeout: 3000});  
        });    
    });
});