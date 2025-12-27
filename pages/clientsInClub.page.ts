import { Page } from "@playwright/test";

export default class ClientsInClubPage {
    path = "/clients-in-club";
    selector = (page: Page) => ({
        elements: {
            filtersButton: page.locator('//div[contains(text(), "Фильтры")]')
        },
        filtersForm: {
            filtersHeader: page.locator('//h1[contains(text(), "Фильтры")]'),
            dateFromInput: page.getByTestId('dateFrom'),
            dateToInput: page.getByTestId('dateTo'),
            searchSelectInput: page.getByTestId('search-select')
        }
    });
}