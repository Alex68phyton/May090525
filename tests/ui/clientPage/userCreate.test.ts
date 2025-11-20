import test from "../baseTest";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import authCRMTestData from "@data/authCRM.json";
import userTestData from "@data/user.json";

test.describe("Тесты на создание клиента в CRM", async () => {
    test("Создание юзера", async ({ page, loginPage}) => {
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
        await test.step("Проверить, что пользователь видит инпут для ввода кода", async () => {
            await page.locator("//form//div[contains(., 'Код')]/div/div/input").waitFor({state: 'visible', timeout: 3000});  
        });
    });
});