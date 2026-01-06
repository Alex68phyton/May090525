import { FrameLocator, Page } from "@playwright/test";

export default class CpWidgetPage {

    selector = (page: Page ) => ({
        element: {
            iframeWidget: page.frameLocator('iframe[src*="cloudpayments.ru"]')
        }
    });
    iframe = (iframe: FrameLocator) => ({
        element: {
            choicePaymentButton: iframe.getByText(' Банковской картой '),
            cardNumberInput: iframe.getByText(' Номер карты ')
        }
    });

    async successPayment(page: Page, cardNumber: string, cardExpired: string) {
        const iframe = await page.frameLocator('iframe[src*="cloudpayments.ru"]');
        await iframe.getByText(' Банковской картой ').click();
        await iframe.getByText(' Номер карты ').click();
        await iframe.getByPlaceholder('0000 0000 0000 0000').fill(cardNumber);
        await iframe.getByPlaceholder('00/00').fill(cardExpired);
        await iframe.getByRole("button", { name: ' Оплатить '}).click();
        await iframe.locator('button.button_primary').click();
        await page.waitForURL('**/checkout/**');
        await page.close();
    }
}