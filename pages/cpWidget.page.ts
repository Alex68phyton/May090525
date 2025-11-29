import { FrameLocator, Page } from "@playwright/test";

export default class CpWidgetPage {

    selector = (page?: any, iframe?: any) => ({
        element: {
            choicePaymentButton: iframe.getByText(' Банковской картой '),
            iframeWidget: page.frameLocator('iframe[src*="cloudpayments.ru"]')
        }
    });
}