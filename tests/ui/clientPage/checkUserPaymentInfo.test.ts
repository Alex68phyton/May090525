import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import { formatPayDate } from "@utils/getAnyDate";
import { selectTransactionsWithUser } from "db/transactions.db";
import api from "../../../api.json";

test.describe("Тесты на проверку записи клиента на тренировку в CRM", async () => {
    test.only("Проверку записи клиента на тренировку в CRM", async ({ page, loginPage, headerBlock, clientPage }) => {

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
    
        const payDate = await test.step("Получить отформатированную дату", async() => {
            console.log(transaction);
            return await formatPayDate(transaction.updated_at);
            
        });
        await console.log(payDate);

        await test.step("Перейти на страницу юзера", async() => {
            await page.goto(`${api.paths.clients}/${transaction.user_id}`);
        });

        await test.step("Проверить, что пользователь видит запись о последней платежной транзакции", async () => {    
            await clientPage.selector(page, undefined, payDate).elements.paymentInfo.waitFor({ state: 'visible', timeout: 3000 });
        });
    });
});