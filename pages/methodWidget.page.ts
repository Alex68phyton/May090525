import { Page } from "@playwright/test";

export default class MethodWidgetPage {

    selector = (page: Page ) => ({
        element: {
            cardDateInfo: page.getByTestId('card:date-input'), 
            cardNumberInfo: page.getByTestId('card:pan-input'),
            cardCvvInfo: page.getByTestId('card:code-input')
        }
    });

    async successPayment(page: Page, cardNumber: string, cardDate: string, cardCvv: string) {
        await page.getByTestId('card:pan-input').fill(cardNumber);
        await page.getByTestId('card:date-input').fill(cardDate);
        await page.getByTestId('card:code-input').fill(cardCvv);
        //await input.click({ force: true });
        //await page.keyboard.type(cardNumber, { delay: 50 });
        await page.getByTestId('card:submit-btn').click();
        await page.waitForURL('**/checkout/**');
        await page.close();
    }
}