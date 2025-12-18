import { Page } from "@playwright/test";

export default class FaqPage {
    path = "/faq";
    selector = (page: Page) => ({
        chapterName: {
            faqToFaq: page.locator('//div[contains(text(), "Как пользоваться разделом FAQ")]')
        },
        articleName: {
            faqToFaqLink: page.locator('//span[contains(text(), "Как пользоваться разделом FAQ")]')
        },

    });
}

