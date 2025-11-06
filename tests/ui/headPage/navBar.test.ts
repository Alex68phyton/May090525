import test, { expect } from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";

test.describe("Проверка перехода по ссылкам в боковом меню", async() => {    
    test("Проверка перехода по ссылкам в боковом меню", async ({ page }) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
            await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
            await page.getByRole('button', { name: 'Войти' }).click();
        });
        await test.step("Проверка перехода по ссылке клиенты в клубе", async () => {
            await test.step("Перейти на страницу клиенты в клубе", async () => {
                await page.getByText('Клиенты в клубе').click();  
            });
            await test.step("Проверить, что пользователь находится на странице Клиенты в клубе", async () => {
                expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/clients-in-club");
            });
        });    
        await test.step("Проверка перехода по ссылке Главная", async () => {
            await test.step("Перейти на страницу Главная", async () => {
                await page.getByText('Главная').click();  
            });

            await test.step("Проверить, что пользователь находится на странице Главная", async () => {
                expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/");
            });
        });    

        await test.step("Проверка перехода по ссылке Расписание", async () => {
            await test.step("Перейти на страницу Расписание", async () => {
                await page.getByText('Расписание').click();  
            });
            await test.step("Проверить, что пользователь находится на странице Расписание", async () => {
                expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/schedule")
            });
        });

        await test.step("Проверка перехода по ссылке Акции", async () => {
            await test.step("Перейти на страницу Акции", async () => {
                await page.getByText('Акции').click();  
            });
            await test.step("Проверить, что пользователь находится на странице Акции", async () => {
                expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/discounts");
            });
        });   

        await test.step("Проверка перехода по ссылке Клубы", async () => {
            await test.step("Перейти на страницу Клубы", async () => {
                await page.getByText('Клубы').click();  
            });
        await test.step("Проверить, что пользователь находится на странице Клубы", async () => {
            expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/clubs");
            });
        });    

        await test.step("Проверка перехода по ссылке FAQ", async () => {
            await test.step("Перейти на страницу FAQ", async () => {
                await page.getByText('FAQ').click();  
            });
            await test.step("Проверить, что пользователь находится на странице FAQ", async () => {
                expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/faq");
            });
        });    

        await test.step("Проверка перехода по ссылке Аналитика", async () => {
            await test.step("Перейти на страницу Аналитика", async () => {
                await page.getByText('Аналитика').click();  
            });
            await test.step("Проверить, что пользователь находится на странице Аналитика", async () => {
                expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/analytics");
            });    
        });
    });
});