import test from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../api.json";

test.describe("Проверка перехода по ссылкам в боковом меню", async() => {    
    test.beforeEach(async ({ page }) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
            await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
            await page.getByRole('button', { name: 'Войти' }).click();
        });
    });

    test("Проверка перехода по ссылке клиенты в клубе", async ({ page }) => {
        await test.step("Перейти на страницу клиенты в клубе", async () => {
            await page.getByText('Клиенты в клубе').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Клиенты в клубе", async () => {
            await page.waitForURL("https://crm.test.ddxfitness.ru/clients-in-club");  
        });    
    });
    test("Проверка перехода по ссылке Главная", async ({ page }) => {
        await test.step("Перейти на страницу Главная", async () => {
            await page.getByText('Главная').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Главная", async () => {
            await page.getByText("Нужно найти клиента").waitFor({state: 'visible', timeout: 3000});
        });    
    });
    test("Проверка перехода по ссылке Расписание", async ({ page }) => {
        await test.step("Перейти на страницу Расписание", async () => {
            await page.getByText('Расписание').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Расписание", async () => {
            await page.getByRole('button', { name: 'Добавить занятие' }).waitFor({state: 'visible', timeout: 3000});
        });    
    });
    test("Проверка перехода по ссылке Акции", async ({ page }) => {
        await test.step("Перейти на страницу Акции", async () => {
            await page.getByText('Акции').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Акции", async () => {
            await page.getByText("Доступные интерфейсы").waitFor({state: 'visible', timeout: 3000});
        });    
    });
    test("Проверка перехода по ссылке Клубы", async ({ page }) => {
        await test.step("Перейти на страницу Клубы", async () => {
            await page.getByText('Клубы').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Клубы", async () => {
            await page.getByText("Clubs Page").waitFor({state: 'visible', timeout: 3000});
        });    
    });
    test("Проверка перехода по ссылке FAQ", async ({ page }) => {
        await test.step("Перейти на страницу FAQ", async () => {
            await page.getByText('FAQ').click();  
        });
        await test.step("Проверить, что пользователь находится на странице FAQ", async () => {
            await page.waitForURL("https://crm.test.ddxfitness.ru/faq");
        });    
    });
    test("Проверка перехода по ссылке Аналитика", async ({ page }) => {
        await test.step("Перейти на страницу Аналитика", async () => {
            await page.getByText('Аналитика').click();  
        });
        await test.step("Проверить, что пользователь находится на странице Аналитика", async () => {
            await page.waitForURL("https://crm.test.ddxfitness.ru/analytics");
        });    
    });
});