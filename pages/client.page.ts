import { Page } from "@playwright/test";

export default class ClientPage {
    getPath(userId: string) {
        return `/client/${userId}`;
    }

    selector = (page: Page, crmStatus?: string, payDate?: string) => ({
        button: {
            blockButton: page.locator('//div[contains(text(), "Заблокировать")]'),
            blockFormButton: page.locator('(//div[contains(text(), "Заблокировать")])[2]'),
            unblockButton: page.locator('//div[contains(text(), "Разблокировать")]'),
            allRecordOpenButton: page.getByRole('button', { name: 'Открыть все записи' })
        },
        elements: {
            paymentPlanStatus: page.locator(`//div[@data-testid="subscription-name"]/../div[2]/div[text()="${crmStatus}"]`),
            paymentInfo: page.locator(`//td[contains(text(), "${payDate}")]`)
        }
    });

    async userBlock(page: Page) {
        await page.locator('//div[contains(text(), "Заблокировать")]').click();
        await page.getByPlaceholder('Введите текст блокирующей заметки').fill("block");
        await page.locator('(//div[contains(text(), "Заблокировать")])[2]').click();
    }
}