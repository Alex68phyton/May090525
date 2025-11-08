import test, { expect } from "@playwright/test";
import { selectUserPaymentPlanByStatus } from "db/userPaymentPlans.db";
import api from "../../../api.json";
import authCRMTestData from "@data/authCRM.json";
import { getCrmStatusByDbStatus } from "@utils/crmStatusSwitcher";
import dbStatus from "@data/userPaymentPlanStatuses.json"

test.describe("Тесты на проверку отображения статуса подписки на карточке клиента", () =>{
    test.beforeEach( async({page}) => {
        await test.step("Авторизоваться в CRM", async () => {
            await page.goto(api.urls.crm_test_url);
            await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
            await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
            await page.getByRole('button', { name: 'Войти' }).click();
            await page.getByTestId('phone-input').waitFor({state: 'visible', timeout: 3000});
        });
    });


    Object.values(dbStatus).forEach(dbStatus => {
        test(`Проверка отображения подписки в статусе ${dbStatus} на карточке клиента`, async ({ page }) => {
            const crmStatus = getCrmStatusByDbStatus(dbStatus);
            const userPaymentPlan = await test.step(`Получить клиента с подпиской в статусе ${dbStatus}`, async () => {
                return await selectUserPaymentPlanByStatus(dbStatus);
            });

            await test.step("Перейти на страницу клиента", async() => {
                await page.goto(`${api.urls.crm_test_url}client/${userPaymentPlan.user_id}`);
            });

            await test.step("Проверить, что статус подписки отображается в карточке клиента", async () => {
                await expect(page.locator(`//div[@data-testid="subscription-name"]/../div[2]/div[text()="${crmStatus}"]`)).toBeVisible();
            });
        });

    });
});