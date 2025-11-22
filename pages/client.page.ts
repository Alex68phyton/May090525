import { Page } from "@playwright/test";

export default class ClientPage {
    getPath(userId: string) {
        return `/client/${userId}`;
    }

    selector = (page: Page) => ({
        button: {
            blockButton: page.locator('//div[contains(text(), "Заблокировать")]'),
            blockFormButton: page.locator('(//div[contains(text(), "Заблокировать")])[2]'),
            unblockButton: page.locator('//div[contains(text(), "Разблокировать")]')
        }
    });

    async userBlock(page: Page) {
        await page.locator('//div[contains(text(), "Заблокировать")]').click();
        await page.getByPlaceholder('Введите текст блокирующей заметки').fill("block");
        await page.locator('(//div[contains(text(), "Заблокировать")])[2]').click();
    }
}