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
}