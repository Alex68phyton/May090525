import { FrameLocator, Page } from "@playwright/test";

export default class MethodWidgetPage {

    selector = (page: Page ) => ({
        element: {
            iframeWidget: page.frameLocator('iframe[src*="cloudpayments.ru"]')
        }
    });

    async successPayment(page: Page, cardNumber: string) {
        await page.getByTestId('card:date-input').fill(cardNumber);
        await page.getByTestId('card:submit-btn').click();
        await page.waitForURL('**/checkout/**');
        await page.close();
    }
}