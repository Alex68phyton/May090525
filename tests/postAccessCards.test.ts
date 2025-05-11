import { expect, request, test } from "@playwright/test";
import api from '../api.json'
import { log } from "../utils/logger";

test.describe("API-тесты на создание карт доступа", async () => {
    test.only("[positive] создание карты доступа", async ({request}) => {
        const url = `${api.urls.base_url_api}${api.paths.access_cards}`;
        const data = {
            session_id: "549297f8-e38a-47cd-915e-2a1859102539",
            request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
            request_source: "mobile_app",
            data: [
                {
                    access_card_number: "CAMELtest1",
                    user_id: 296978,
                    type: "disposable_card",
                    is_blocked: false,
                    is_lost: false,
                    is_deleted: false
        
                }
            ]};
        log("Request url", url);
        log("Параметры", data)    
        const response = await request.post(
            url,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: data
            }
        );
        log("Response body", JSON.stringify(await response.json(), null, '\t'));
        expect(response.status()).toEqual(200);
    });
         
});