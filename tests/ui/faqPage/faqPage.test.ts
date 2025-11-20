import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import api from "../../../api.json";

test.describe("Тесты на проверку страницы FAQ", async() => {    
    test("Проверка перехода на страницы статей", async ({ page, loginPage, navbarBlock, faqPage, articlePage }) => {
        
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Проверка перехода по ссылке FAQ", async () => {
            await test.step("Перейти на страницу FAQ", async () => {
                await navbarBlock.selector(page).navbarLink.faqLink.click();  
            });
        });
        await test.step("Проверить, что пользователь находится на странице FAQ", async () => {
            expect.soft(page.url()).toContain(`${faqPage.path}`);
        });
        await test.step("Открыть раздел Как пользоваться разделом FAQ", async () => {
            await faqPage.selector(page).chapterName.faqToFaq.dblclick();  
        });
        await test.step("Перейти в статью Как пользоваться разделом FAQ", async () => {
            await faqPage.selector(page).articleName.faqToFaqLink.click();
        
        });
        await test.step("Проверить, что пользователь находится на странице статьи Как пользоваться разделом FAQ", async () => {
            expect.soft(page.url()).toContain(`${articlePage.path}/89`);
        });
        await test.step("Проверить, что пользователь видит указанные элементы на странице", async () => {
            expect.soft(articlePage.selector(page).elements.breadCrumbs.isVisible());
            expect.soft(articlePage.selector(page).elements.nextTopic.isVisible());
            expect.soft(articlePage.selector(page).elements.previousTopic.isVisible());
            expect.soft(articlePage.selector(page).elements.title.isVisible());
        });

    });
});