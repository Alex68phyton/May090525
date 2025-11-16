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
    })
}