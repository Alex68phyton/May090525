import { Page } from "@playwright/test";

export default class AddClientPage {
    selector = (page: Page) => ({
        elements: {
            phoneInput: page.locator('//div[contains(text(), "Номер телефона")]/following-sibling::*[1]//div//input'),
            codeConfirmationInput: page.locator("//form//div[contains(., 'Код')]/div/div/input"),
            paymentServiceInput: page.locator("")
        },
        buttons: {
            confirmCodeButton: page.getByText("Подтвердить"),
            sendLinkButton: page.getByText("Отправить ссылку")
        }
    });
}