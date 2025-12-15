import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import TransactionsRequests from "@requests/transactions.requests";
import { selectTransactionsWithUser } from "db/transactions.db";
import { validateJson } from "@utils/validator.util";
import { transactionResponseSchema } from "@entities/transactions.response";



test.describe("API-тесты на получение транзакций", async () => {
    test("[positive] получение транзакций конкретного юзера", async ({request}) => {
        const transactions = await test.step("получить id юзера, у которого есть транзакции", async () => {
                    return await selectTransactionsWithUser();
                });

        const response = await test.step("Получить транзакции юзера", async () => { 
                const parameters = {...await getBaseParameters(),...{user_id: transactions.user_id}};
                return await (await new TransactionsRequests(request).getTransactions(200, parameters)).json();
        });

        await test.step("Проверить схему ответа", async () => {
            await expect(validateJson(transactionResponseSchema, response)).resolves.toBeTruthy();
        });            
    });         
});