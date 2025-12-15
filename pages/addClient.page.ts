import { Page } from "@playwright/test";

export default class AddClientPage {
    selector = (page: Page) => ({
        elements: {
            phoneInput: page.locator('//div[contains(text(), "Номер телефона")]/following-sibling::*[1]//div//input')
        }
    });
}