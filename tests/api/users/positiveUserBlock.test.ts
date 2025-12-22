import UserBlockRequests from "@requests/userBlock.request";
import { Statuses } from "@libs/statuses";
import { getUserBlockRequestJson } from "@entities/users/userBlock.requestJson";
import { validateJson } from "@utils/validator.util";
import { baseResponseJsonSchema } from "@entities/base.response";
import { userBlockDataJsonSchema } from "@entities/users/userBlock.response";
import test, { expect } from "../baseApiTest.fixture";



test.describe("API-тесты на поиск клиента", async () => {
    test("Заблокировать клиента", async({request, userId}) => {
        const response = await test.step("Заблокировать клиента", async () => {
            const requestBody = await getUserBlockRequestJson();
            return (await (await new UserBlockRequests(request).postUserBlock(Statuses.OK, requestBody, userId)).json());
        });
        await test.step("Проверить схему ответа", async () => {
                    await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
                    await expect(validateJson(userBlockDataJsonSchema, response.data)).resolves.toBeTruthy();
                })
        await test.step("Проверить тип заметки заблокированного клиента", async () => {
            expect(response.data.notes.type).toEqual("block");
        });                
    });
});