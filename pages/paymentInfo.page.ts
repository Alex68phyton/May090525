import { Page } from "@playwright/test";

export default class ClientPaymentInfoPage {
    selector = (page: Page, transactionId: number ) => ({
        transactions: {
            paymentId: page.getByText(`${transactionId}`)
        }
    });
}