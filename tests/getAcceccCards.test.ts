import { expect, request, test } from "@playwright/test";
import api from '../api.json'
import { log } from "../utils/logger";
import AccessCardsRequests from "../requests/accessCards.requests";
import { getBaseParameters } from "../entities/baseParameters";

const requestBody = {
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

test.describe("API-тесты на получение карт доступа", async () => {
    test("[positive] получение карт доступа", async ({request}) => {
            const createCard = await new AccessCardsRequests(request).postAccessCards(200, requestBody);
            const response = await new AccessCardsRequests(request).getAccessCardsById(200, await getBaseParameters(), (await createCard.json()).data[0].id);
            expect((await response.json()).data[0].user.id).toEqual((await createCard.json()).data[0].user.id);
    });
         
});