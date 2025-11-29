import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { selectCardToken } from "db/cardTokens.db";
import CardsTokensRequests from "@requests/cardTokens.requests";
import { validateJson } from "@utils/validator.util";
import { baseResponseJsonSchema } from "@entities/base.response";
import { cardTokensResponseJsonSchema } from "@entities/cardTokens.response";



test.describe("API-тесты на получение банковских карт", async () => {
    let card_token_user: number;
    let card_token_number: string | null;
    test.only("[positive] получение банковских карт юзера", async ({request}) => {
        [card_token_user, card_token_number] = await test.step("Получить в БД клиента с токеном", async () => {
            const cardToken = await selectCardToken();
            return [cardToken.user_id, cardToken.public_card_number] 
        });
        const cardTokensResponse = await test.step("Получить карту по user_id", async () => { 
                const parameters = {...await getBaseParameters(),...{user_id: card_token_user}};
                const response = await (await new CardsTokensRequests(request).getCardTokens(200, parameters)).json();
                return response;
        });
        await test.step("Проверить схему ответа", async () => {
            await expect(validateJson(baseResponseJsonSchema, cardTokensResponse)).resolves.toBeTruthy();
            await expect(validateJson(cardTokensResponseJsonSchema, cardTokensResponse.data[0])).resolves.toBeTruthy();
        });
        await test.step("Проверить соответствие номера карты в ответе карте в БД", async () => {
            await expect(card_token_number).toEqual(cardTokensResponse.data[0].public_card_number);
        });            
    });         
});