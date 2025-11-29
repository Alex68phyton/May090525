import test, { expect } from "../baseTest";
import { selectUserPaymentPlanByStatus } from "db/userPaymentPlans.db";
import paths from "../../../api.json";
import authCRMTestData from "@data/authCRM.json";
import dbStatus from "@data/userPaymentPlanStatuses.json";
import crmStatus from "@data/crmUserPaymentPlanStatus.json";
import { getPaymentCreateRequestJson } from "@entities/paymentCreate.requestJson";
import UserPaymentCreateRequests from "@requests/paymentCreate.requests";

test.describe("Тесты на проверку отображения статуса подписки на карточке клиента", () =>{
    test.beforeEach( async({page, loginPage}) => {
        await test.step("Авторизоваться в CRM", async () => {
            await page.goto("");
            await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
            await page.getByTestId('phone-input').waitFor({state: 'visible', timeout: 10000});
        });
    });


    test.only(`Проверка отображения подписки в статусе  на карточке клиента`, async ({ page, request, clientPage, cpWidgetPage }) => {
        const userPaymentPlan = await test.step(`Получить клиента с подпиской в статусе ${dbStatus}`, async () => {
            return await selectUserPaymentPlanByStatus(dbStatus.created);
        });

        const paymentCreateWidgetLink = await test.step("Отправить запрос на оплату", async() => {
            const requestBody = await getPaymentCreateRequestJson(Number(userPaymentPlan.user_id), Number(userPaymentPlan.id), 2);
            console.log(userPaymentPlan);
            console.log(requestBody);
            const paymentCreateResponse = (await (await new UserPaymentCreateRequests(request).postUserPaymentCreate(200, requestBody)).json());
            return paymentCreateResponse.transaction.payment_widget_uri;
        })

        await test.step("Перейти на страницу клиента", async() => {
            await page.goto(`${paths.paths.clients}/${Number(userPaymentPlan.user_id)}`);
        });

        await test.step("Проверить, что статус подписки отображается в карточке клиента", async () => {
            await expect(clientPage.selector(page,crmStatus.created).elements.paymentPlanStatus).toBeVisible({timeout: 30000});
        });
        await test.step("Открыть новую вкладку, перейти на виджет и убедиться, что пользователь находится на странице оплаты", async () => {
            const newPage = await page.context().newPage();
            await newPage.goto(paymentCreateWidgetLink, {waitUntil: "domcontentloaded", timeout: 30000});
            const iframe = await cpWidgetPage.selector(newPage).element.iframeWidget;
            await cpWidgetPage.selector(iframe).element.choicePaymentButton.waitFor({state: 'visible', timeout: 10000});
        });
    });
});