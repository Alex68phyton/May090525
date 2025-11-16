import test, { expect } from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";
import LoginPage from "pages/login.page";
import NavbarPage from "pages/blocks/navbar.block";
import FaqPage from "pages/faq.page";
import ArticlePage from "pages/article.page";

test.describe("Тесты на проверку страницы FAQ", async() => {    
    test.only("Проверка перехода на страницы статей", async ({ page }) => {
        const loginPage = new LoginPage();
        const navbarPage = new NavbarPage();
        const faqPage = new FaqPage();
        const articlePage = new ArticlePage();
        
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Проверка перехода по ссылке FAQ", async () => {
            await test.step("Перейти на страницу FAQ", async () => {
                await navbarPage.selector(page).navbarLink.faqLink.click();  
            });
        });
        await test.step("Проверить, что пользователь находится на странице FAQ", async () => {
            expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/faq");
        });
        await test.step("Открыть раздел Как пользоваться разделом FAQ", async () => {
            await faqPage.selector(page).chapterName.faqToFaq.dblclick();  
        });
        await test.step("Перейти в статью Как пользоваться разделом FAQ", async () => {
            await faqPage.selector(page).articleName.faqToFaqLink.click();
        
        });
        await test.step("Проверить, что пользователь находится на странице статьи Как пользоваться разделом FAQ", async () => {
            expect.soft(page.url()).toContain("https://crm.test.ddxfitness.ru/faq-article/89");
        });
        await test.step("Проверить, что пользователь видит указанные элементы на странице", async () => {
            expect.soft(articlePage.selector(page).elements.breadCrumbs.isVisible());
            expect.soft(articlePage.selector(page).elements.nextTopic.isVisible());
            expect.soft(articlePage.selector(page).elements.previousTopic.isVisible());
            expect.soft(articlePage.selector(page).elements.title.isVisible());
        });

    });
});