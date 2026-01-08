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
        test.only(`Оплата подписки провайдером ${provider}`, async ({ page, loginPage, addClientPage, cpWidgetPage, methodWidgetPage, clientPage}) => {
            //let paymentCreateWidgetLink;
            //page.on('response', async req => {
            //    if (req.url().includes("/payment/create")) {
            //        paymentCreateWidgetLink = (await req.json()).transaction.payment_widget_uri
            //    }
            //});

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
                await page.getByTestId('phone-input').waitFor({state: 'visible', timeout: 3000});
                await page.getByTestId('phone-input').fill(phoneNumber);
                await page.getByTestId('search').getByRole('img').click();
                await page.getByRole('button', { name: 'Создать' }).click();
            });

            await test.step("Заполнить информацию о клиенте", async () => {
                await page.getByPlaceholder('Введите фамилию').fill(userTestData.last_name);
                await page.getByPlaceholder('Введите имя').fill(userTestData.first_name);
                await page.getByPlaceholder('Введите отчество').fill(userTestData.middle_name);
                await page.getByPlaceholder('__.__.____').fill('11111991');
                await page.keyboard.press('Enter');
                const radio = await page.locator('input[name="sex"][value="male"]');
                await radio.evaluate((el: HTMLInputElement) => el.click());
                await page.getByPlaceholder('Введите email').fill(email);
                await page.locator("//div[contains(text(), 'Выберите интервал')]/parent::div/div[2]").click()
                await page.waitForTimeout(1000);
                await page.getByText('Нет опыта').click();
            });
            await test.step("Выбрать подписку, клуб и запросить код верификации", async () => {
                await page.locator("//div[contains(text(), 'Выберите тариф')]/parent::div/div[2]").click();
                await page.waitForTimeout(1000); 
                await page.getByText('Smart 1месяц').click();
                await page.getByPlaceholder('Выберите клуб').click();
                await page.waitForTimeout(1000);
                await page.getByText('Аэропорт').click();
                await page.getByRole('button', { name: 'Отправить код' }).click();
            });

            const confirmationCode = await test.step("Получить код подтверждения из БД", async () => {
                await page.waitForTimeout(3000);
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

            //await page.waitForFunction(() => window['paymentCreateWidgetLink'] !== null, {}, {
            //    polling: 100,
            //    timeout: 30000
            //}).catch(() => {
            //    throw new Error('Не удалось получить ссылку');
            //});

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