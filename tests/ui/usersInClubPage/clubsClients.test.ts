import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";

test.describe("Тесты на функционал клиенты в клубе", async () => {
    test.beforeEach(async( {page, loginPage} ) => {
        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
        });
        await test.step("Заполнить форму авторизации и нажать войти", async () => {
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });
        await test.step("Перейти на страницу клиенты в клубе", async () => {
            await page.getByText('Клиенты в клубе').click();  
        });
    });
    test("Успешный переход на страницу клиенты в клубе", async ( {page} ) => {  
        await test.step("Проверить, что пользователь находится на странице Клиенты в клубе", async () => {
            await page.waitForURL("clients-in-club");  
        });    
    });
    test("Открытие формы фильтров", async( {page, clientsInClubPage} ) => {
        await page.setViewportSize({ width: 1400, height: 953 });
        await test.step("Открыть форму фильтров", async () => {
            await clientsInClubPage.selector(page).elements.filtersButton.click();  
        });
        await test.step("Проверить верстку страницы", async () => {
            await expect(page).toHaveScreenshot("filtersForm.png", {
              fullPage: true,
              maxDiffPixelRatio: 0.02,
              mask: [
                clientsInClubPage.selector(page).filtersForm.searchSelectInput,
                clientsInClubPage.selector(page).filtersForm.dateFromInput,
                clientsInClubPage.selector(page).filtersForm.dateToInput
              ]  
            });
        });
        await test.step("Проверить, что открылась форма с фильтрами", async () => {
            await clientsInClubPage.selector(page).filtersForm.filtersHeader.waitFor({state: 'visible', timeout: 3000});  
        });
    });
});