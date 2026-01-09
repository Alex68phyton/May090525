import { Page } from "@playwright/test";

export default class AddClientPage {
    selector = (page: Page, providerName?: string) => ({
        elements: {
            phoneInput: page.locator('//div[contains(text(), "Номер телефона")]/following-sibling::*[1]//div//input'),
            codeConfirmationInput: page.locator("//form//div[contains(., 'Код')]/div/div/input"),
            paymentServiceInput: page.locator(`div[title=${providerName}]`)
        },
        buttons: {
            confirmCodeButton: page.getByText("Подтвердить"),
            sendLinkButton: page.getByTestId("send-link-button"),
            successConfirmButton: page.getByRole('button', { name: 'Продолжить'}),
            completeRegistrationButton: page.getByRole('button', { name: 'Завершить оформление'})
        }
    });

    async paymentServiceChoose(page: Page, provider: string) {
        switch(provider) {
            case 'CloudPayments':
                await page.locator('(//div[div[text()="Платежный сервис"]]//following-sibling::div)[1]//div[@data-testid="select"]').click();
                await page.waitForTimeout(2000);
                await page.locator(`//*[@data-testid="selected" and @title="${provider}"]`).click();
                await page.getByTestId("send-link-button").click();
                break;
            case 'Method':
                await page.locator('(//div[div[text()="Платежный сервис"]]//following-sibling::div)[1]//div[@data-testid="select"]').click();
                await page.waitForTimeout(2000);
                await page.locator(`div[title="${provider}"]`).click();
                await page.getByTestId("send-link-button").click();
                break;
        }
    }
    async fillUserInfo (page: Page, email: string, lastName: string, firstName: string, middleName: string) {
        await page.getByPlaceholder('Введите фамилию').fill(lastName);
        await page.getByPlaceholder('Введите имя').fill(firstName);
        await page.getByPlaceholder('Введите отчество').fill(middleName);
        await page.getByPlaceholder('__.__.____').fill('11111991');
        await page.keyboard.press('Enter');
        const radio = await page.locator('input[name="sex"][value="male"]');
        await radio.evaluate((el: HTMLInputElement) => el.click());
        await page.getByPlaceholder('Введите email').fill(email);
        await page.locator("//div[contains(text(), 'Выберите интервал')]/parent::div/div[2]").click()
        await page.waitForTimeout(1000);
        await page.getByText('Нет опыта').click();
    }
    async fillPaymentPlanInfo (page: Page) {
        await page.locator("//div[contains(text(), 'Выберите тариф')]/parent::div/div[2]").click();
        await page.waitForTimeout(1000); 
        await page.getByText('Smart 1месяц').click();
        await page.getByPlaceholder('Выберите клуб').click();
        await page.waitForTimeout(1000);
        await page.getByText('Аэропорт').click();
    }
}