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

    async paymentServiceChoose(page: Page, defaultProvider: string, provider: string) {
        await page.locator('(//div[div[text()="Платежный сервис"]]//following-sibling::div)[1]').click();
        await page.waitForTimeout(10000);
        await page.locator(`div[title="${provider}"]`).click();
        await page.getByTestId("send-link-button").click();
    }
}