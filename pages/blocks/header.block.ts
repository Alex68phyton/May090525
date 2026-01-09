import { Page } from "@playwright/test";

export default class HeaderBlock {
    selector = (page: Page) => ({
        search: {
            searchInput: page.getByTestId('phone-input'),
            searchButton: page.getByTestId('search').getByRole('img'),
        },
        clientInfo: {
            openButton: page.getByRole('button', { name: 'Открыть'}),
        }
    });

    async toUserCreate(page: Page, phoneNumber: string) {
        await page.getByTestId('phone-input').waitFor({state: 'visible', timeout: 3000});
        await page.getByTestId('phone-input').fill(phoneNumber);
        await page.getByTestId('search').getByRole('img').click();
        await page.getByRole('button', { name: 'Создать' }).click();
    }
}