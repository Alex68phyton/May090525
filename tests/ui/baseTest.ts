import { mergeTests, test as BaseTest } from "@playwright/test";
import ArticlePage from "pages/article.page";
import NavbarBlock from "pages/blocks/navbar.block";
import FaqPage from "pages/faq.page";
import LoginPage from "pages/login.page";
import api from "../../api.json"
import HeaderBlock from "pages/blocks/header.block";
import ClientPage from "pages/client.page";
import CpWidgetPage from "pages/cpWidget.page";

const test = mergeTests(BaseTest.extend<{
    loginPage: LoginPage,
    navbarBlock: NavbarBlock,
    faqPage: FaqPage,
    articlePage: ArticlePage,
    headerBlock: HeaderBlock,
    clientPage: ClientPage,
    cpWidgetPage: CpWidgetPage
}>({
    baseURL: api.urls.crm_test_url,
    headless: false,
    viewport: { width: 1920, height: 1080 },
    loginPage: async({}, use) => { await use(new LoginPage())},
    navbarBlock: async({}, use) => { await use(new NavbarBlock())},
    faqPage: async({}, use) => { await use(new FaqPage())},
    articlePage: async({}, use) => { await use(new ArticlePage())},
    headerBlock: async({}, use) => { await use(new HeaderBlock())},
    clientPage: async({}, use) => { await use(new ClientPage())},
    cpWidgetPage: async({}, use) => { await use(new CpWidgetPage())}
})
)

export default test;
export const expect = test.expect;