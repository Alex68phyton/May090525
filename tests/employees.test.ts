import { expect, request, test } from "@playwright/test";
import api from '../api.json'
import { getBaseParameters } from "../entities/baseParameters";

const clubId = [1,2,3];

clubId.forEach(club_id => {
test.describe("API-тесты на получение списка сотрудников", async () => {
    test(`[positive] получить список сотрудников в ${club_id}`, async ({request}) => {
        const response = await request.get(
            `${api.urls.base_url_api}${api.paths.employees}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                params: {...await getBaseParameters(),...{ club_id: club_id}}
            }
        );

        expect(response.status()).toEqual(200);
    });
});
});