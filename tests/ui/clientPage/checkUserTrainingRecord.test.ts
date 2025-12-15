import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import { selectFirstTrainingWithBookedUser } from "db/groupTraining.db";

test.describe("Тесты на проверку записи клиента на тренировку в CRM", async () => {
    test("Проверку записи клиента на тренировку в CRM", async ({ page, loginPage }) => {

        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto("");
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
        });

        await test.step("Проверить, что пользователь находится в CRM и видит поле поиска", async () => {
            await page.locator("//input[@data-testid='phone-input']").waitFor({state: 'visible', timeout: 3000});  
        });

        const trainingWithUser = await test.step("получить тренировку с записанным юзером", async () => {
            return await selectFirstTrainingWithBookedUser();
        });

        await test.step("Перейти на страницу юзера", async() => {
            await page.goto(`client/${trainingWithUser?.user_id}`);
        });

        await test.step("Проверить, что пользователь видит запись на тренировку с корректным названием", async () => {
            if (!trainingWithUser?.training_name) {
                throw new Error('Не удалось получить название тренировки для проверки');
            }
    
        await page.getByText(trainingWithUser.training_name).waitFor({ state: 'visible', timeout: 3000 });
        });
    });
});