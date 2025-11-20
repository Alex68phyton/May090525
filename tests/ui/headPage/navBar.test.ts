import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";
import LoginPage from "pages/login.page";

test.describe("Проверка перехода по ссылкам в боковом меню", async() => {    
    test("Проверка перехода по ссылкам в боковом меню", async ({ page, loginPage }) => {
        
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Проверка перехода по ссылке клиенты в клубе", async () => {
            await test.step("Перейти на страницу клиенты в клубе", async () => {
                await page.getByText('Клиенты в клубе').click();  
            });
            await test.step("Проверить, что пользователь находится на странице Клиенты в клубе", async () => {
                expect.soft(page.url()).toContain("clients-in-club");
            });
        });    
        await test.step("Проверка перехода по ссылке Главная", async () => {
            await test.step("Перейти на страницу Главная", async () => {
                await page.getByText('Главная').click();  
            });

            await test.step("Проверить, что пользователь находится на странице Главная", async () => {
                expect.soft(page.url()).toContain("");
            });
        });    

        await test.step("Проверка перехода по ссылке Расписание", async () => {
            await test.step("Перейти на страницу Расписание", async () => {
                await page.getByText('Расписание').click();  
            });
            await test.step("Проверить, что пользователь находится на странице Расписание", async () => {
                expect.soft(page.url()).toContain("schedule")
            });
        });

        await test.step("Проверка перехода по ссылке Акции", async () => {
            await test.step("Перейти на страницу Акции", async () => {
                await page.getByText('Акции').click();  
            });
            await test.step("Проверить, что пользователь находится на странице Акции", async () => {
                expect.soft(page.url()).toContain("discounts");
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