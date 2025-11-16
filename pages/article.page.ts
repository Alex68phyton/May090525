import { Page } from "@playwright/test";

export default class ArticlePage {

    selector = (page: Page) => ({
        elements: {
            breadCrumbs: page.locator('//div[contains(text(), "FAQ")][2]'),
            previousTopic: page.locator('//div[contains(text(), "Предыдущая тема")]'),
            nextTopic: page.locator('//div[contains(text(), "Следующая тема")]'),
            title: page.getByTitle('DDX Fitness CRM')
        },
    });
}