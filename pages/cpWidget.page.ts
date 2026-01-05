import { FrameLocator, Page } from "@playwright/test";

export default class CpWidgetPage {

    selector = (page: Page ) => ({
        element: {
            iframeWidget: page.frameLocator('iframe[src*="cloudpayments.ru"]')
        }
    });
    iframe = (iframe: FrameLocator) => ({
        element: {
            choicePaymentButton: iframe.getByText(' Банковской картой ')
        }
    });

    async successPayment(page: Page, login: string, password: string) {
        await page.getByPlaceholder('Логин').fill(login);
        await page.getByPlaceholder('Пароль').fill(password);
        await page.getByRole('button', { name: 'Войти' }).click();
    }
}