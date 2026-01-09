import test, { expect } from "../baseTest";
import authCRMTestData from "@data/authCRM.json";
import crmStatus from "@data/crmUserPaymentPlanStatus.json";
import paymentInfo from "@data/paymentInfo.json";
import { selectUserNotification } from "db/userNotifications.db";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import userTestData from "@data/user.json";

test.describe("Тесты на оплату подписки", () =>{
    let providerNames = ['CloudPayments', 'Method'];
    providerNames.forEach(provider => {
        test.only(`Оплата подписки провайдером ${provider}`, async ({ page, loginPage, addClientPage, cpWidgetPage, methodWidgetPage, clientPage, headerBlock}) => {

            test.setTimeout(100000);
            const phoneNumber = await test.step("Создать номер телефона клиента", () => getRandomPhoneNumber());
            const email = await test.step("Создать email", () => getRandomEmail());

            await test.step("Перейти на страницу входа в CRM", async () => {
                await page.goto("");
            });

            await test.step("Заполнить форму авторизации и нажать войти", async () => {
                await loginPage.login(page, authCRMTestData.login, authCRMTestData.password);
            });

            await test.step("Ввести номер телефона в поиске и перейти на страницу создания клиента", async () => {
                headerBlock.toUserCreate(page, phoneNumber);
            });

            await test.step("Заполнить информацию о клиенте", async () => {
                addClientPage.fillUserInfo(page, email, userTestData.last_name, userTestData.first_name, userTestData.middle_name);
            });
            await test.step("Выбрать подписку, клуб и запросить код верификации", async () => {
                addClientPage.fillPaymentPlanInfo(page);
                await page.getByRole('button', { name: 'Отправить код' }).click();
            });

            const confirmationCode = await test.step("Получить код подтверждения из БД", async () => {
                await page.waitForTimeout(6000);
                const userNotification = await selectUserNotification(email);
                const body = userNotification.body as any;
                const code = body?.variables?.code || null;
                return code;
            });

            await test.step("Ввести код подтверждения и нажать Подтвердить", async () => {
                await addClientPage.selector(page).elements.codeConfirmationInput.fill(confirmationCode);
                await addClientPage.selector(page).buttons.confirmCodeButton.click();
                await page.waitForTimeout(3000);
            });

            const paymentCreateWidgetLink = await test.step("Выбрать платежный сервис и отправить ссылку на оплату", async () => {
                const paymentCreateResponse = page.waitForResponse('**/payment/create');
                await addClientPage.paymentServiceChoose(page, provider);
                const response = await paymentCreateResponse;
                const responseBody = await response.json();
                return responseBody.transaction.payment_widget_uri;
            });

            const mainPage = page;

            await test.step("Открыть новую вкладку,перейти на виджет и успешно оплатить", async () => {
                const newPage = await page.context().newPage();
                await newPage.goto(paymentCreateWidgetLink, {waitUntil: "domcontentloaded", timeout: 90000});
                if (provider === 'CloudPayments') {
                    await cpWidgetPage.successPayment(newPage, paymentInfo.cloudPayments.successCardInfo, paymentInfo.cloudPayments.cardExpiredAndCvv);
                }
                else await methodWidgetPage.successPayment(newPage, paymentInfo.method.successCardNumber, paymentInfo.method.cardExpired, paymentInfo.method.cardCvv);
            });

            await test.step("Закрыть страницу создания подписки и проверить наличие активной подписки на карточке клиента", async () => {
                await addClientPage.selector(mainPage).buttons.successConfirmButton.click();
                await addClientPage.selector(mainPage).buttons.completeRegistrationButton.click();
                await mainPage.reload();
                await expect(clientPage.selector(mainPage, crmStatus.active).elements.paymentPlanStatus).toBeVisible();
            });
        });
    });
});