import test, { expect } from "../baseApiTest.fixture";
import { baseResponseJsonSchema } from "@entities/base.response";
import { validateJson } from "@utils/validator.util";
import { getGroupTrainingTimeTableRequestJson } from "@entities/groupTrainingTimeTable.requestJson";
import { createGroupTrainingTimeTableJsonSchema } from "@entities/groupTrainingTimeTables.response";
import GroupTrainingTimeTablesRequests from "@requests/groupTrainingTimeTables.requests";



test.describe("API-тесты на создание тренировок в расписании", async () => {
    test("[positive] создание тренировки без повтора", async ({request, clubId, clubZoneId, groupTrainingId}) => {

            const response = await test.step("Создать тренировку в расписании", async () => { 
                const requestBody = await getGroupTrainingTimeTableRequestJson(groupTrainingId, clubId, clubZoneId);

            const getGTTTResponse = (await (await new GroupTrainingTimeTablesRequests(request).postGroupTrainingTimeTables(200, requestBody)).json());
            return getGTTTResponse;       
            });

            await test.step("Проверить схему ответа", async () => {
                await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
                await expect(validateJson(createGroupTrainingTimeTableJsonSchema, response.data[0])).resolves.toBeTruthy();
            });
                    
    });
         
});
