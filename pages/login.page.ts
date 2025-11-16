import { Page } from "@playwright/test";

export default class LoginPage {
    path = "/";

    selector = (page: Page) => ({
        authForm: {
            loginInput: page.getByPlaceholder('Логин'),
            passwordInput: page.getByPlaceholder('Пароль'),
            loginButton: page.getByRole('button', { name: 'Войти'})
        }
    });

    async login(page: Page, login: string, password: string) {
        await page.getByPlaceholder('Логин').fill(login);
        await page.getByPlaceholder('Пароль').fill(password);
        await page.getByRole('button', { name: 'Войти' }).click();
    }
}