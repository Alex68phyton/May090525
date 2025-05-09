import { expect, request, test } from "@playwright/test";
import api from '../api.json'

test.describe("API-тесты на создание заметок", async () => {
    test("[positive] создание заметки", async ({request}) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.notes}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: {
                    session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                    request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                    request_source: "crm",
                    data: [
                      {
                        text: "Трололо",
                        employee_id: 2549,
                        user_id: 296978,
                        contact_id: 1,
                        type: "block"
                      }
                    ]
                  }
            }
        );

        expect(response.status()).toEqual(200);
    });
         
});