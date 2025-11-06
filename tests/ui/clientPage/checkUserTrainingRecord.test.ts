import {  test } from "@playwright/test";
import api from '../../../api.json';
import authCRMTestData from "@data/authCRM.json";
import { findFirstTrainingWithBookedUser } from "db/groupTraining.db";

test.describe("Тесты на проверку записи клиента на тренировку в CRM", async () => {
    test("Проверку записи клиента на тренировку в CRM", async ({request, page}) => {

        await test.step("Перейти на страницу входа в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
            await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
            await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
            await page.getByRole('button', { name: 'Войти' }).click();
        });

        const trainingWithUser = await test.step("получить тренировку с записанным юзером", async () => {
            return await findFirstTrainingWithBookedUser();
        });

        await test.step("Перейти на страницу юзера", async() => {
            await page.goto(`${api.urls.crm_test_url}client/${trainingWithUser?.userId}`);
        });

        await test.step("Проверить, что пользователь видит запись на тренировку с корректным названием", async () => {
            if (!trainingWithUser?.trainingName) {
                throw new Error('Не удалось получить название тренировки для проверки');
            }
    
        await page.getByText(trainingWithUser.trainingName).waitFor({ state: 'visible', timeout: 3000 });
        });
    });
});