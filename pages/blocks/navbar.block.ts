import { Page } from "@playwright/test";

export default class NavbarPage {

    selector = (page: Page) => ({
        navbarLink: {
            headlink: page.getByText('Главная'),
            scheduleLink: page.getByText('Расписание'),
            discountLink: page.getByText('Акции'),
            clubsLink: page.getByText('Клубы'),
            clientsClubLink: page.getByText('Клиенты в клубе'),
            analyticsLink: page.getByText('Аналитика'),
            faqLink: page.getByText('FAQ')
        }
    });
}