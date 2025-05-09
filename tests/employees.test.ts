import { expect, request, test } from "@playwright/test";
import api from '../api.json'
import { getBaseParameters } from "../entities/baseParameters";
test.describe("API-тесты на получение списка тарифов", async () => {
    test.only("[positive] получить список тарифов", async ({request}) => {
        const response = await request.get(
            `${api.urls.base_url_api}${api.paths.employees}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                params: {...await getBaseParameters()}
            }
        );

        expect(response.status()).toEqual(200);
    });
});