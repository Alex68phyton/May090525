import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import { selectTransactionsWithUser } from "db/transactions.db";
import api from "../../../api.json";

test.describe("Тесты на проверку записи клиента на тренировку в CRM", async () => {
    test("Проверку записи клиента на тренировку в CRM", async ({ page, loginPage, headerBlock, clientPage, clientPaymentInfoPage }) => {

        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });

        await test.step("Проверить, что пользователь находится в CRM и видит поле поиска", async () => {
            await headerBlock.selector(page).search.searchInput.waitFor({state: 'visible', timeout: 3000});  
        });

        const transaction = await test.step("получить id юзера, у которого есть транзакции", async () => {
            return await selectTransactionsWithUser();
        });

        await test.step("Перейти на страницу юзера", async() => {
            await page.goto(`${api.paths.clients}/${transaction.user_id}`);
        });
        

        await test.step("Перейти на страницу со всей платежной информацией юзера", async() => {
            await clientPage.selector(page).button.allRecordOpenButton.nth(1).click();
        });

        await test.step("Проверить, что пользователь видит запись о последней платежной транзакции", async () => {    
            await clientPaymentInfoPage.selector(page, transaction.id).transactions.paymentId.waitFor({ state: 'visible', timeout: 3000 });
        });
    });
});