import test from "@playwright/test";
import api from "../../../api.json";

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
});