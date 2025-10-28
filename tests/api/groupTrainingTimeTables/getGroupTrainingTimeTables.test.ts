import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import ClubsRequests from "@requests/clubs.requests";
import GroupTrainingRequests from "@requests/group_training.requests";
import { getGroupTrainingTimeTableRequestJson } from "@entities/groupTrainingTimeTable.requestJson";
import GroupTrainingTimeTablesCreateRequests from "@requests/groupTrainingTimeTables.requests";
import GroupTrainingTimeTablesRequests from "@requests/groupTrainingTimeTables.requests";
import { getCurrentDatePlus7Days, getCurrentDatePlus8Days } from "@utils/getAnyDate";
import { validateJson } from "@utils/validator.util";
import { baseResponseJsonSchema } from "@entities/base.response";
import { getGroupTrainingTimeTableJsonSchema } from "@entities/getGroupTrainingTimeTable.response";



test.describe("API-тесты на получение расписания тренировок", async () => {
    test("[positive] получение списка тренировок с фильтрами по категории, клубу и времени", async ({request}) => {
        const date_to = getCurrentDatePlus8Days();
        const date_from = getCurrentDatePlus7Days();
        const [clubId, clubZone] = await test.step("Получить id клуба и зону", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(200, parameters);
            const getClubsData = await getClubResponse.json();
                return [
                    getClubsData?.data[0]?.id,
                    getClubsData?.data[0]?.club_zones?.[0].id
                ];
        });
        const groupTrainingId = await test.step("Получить id тренировки", async () => {
                const parameters = {...await getBaseParameters()};
                const getGTResponse = await new GroupTrainingRequests(request).getGroupTrainings(200, parameters);
                const getGTData = await getGTResponse.json();
                return getGTData?.data[0]?.id;
        });

        const group_training_time_table_id = await test.step("Создать тренировку в расписании", async () => { 
            const requestBody = await getGroupTrainingTimeTableRequestJson(groupTrainingId, clubId, clubZone);

            const getGTTTResponse = (await (await new GroupTrainingTimeTablesCreateRequests(request).postGroupTrainingTimeTables(200, requestBody)).json());
            return getGTTTResponse.data[0].group_training_time_table_id;       
        });
        const response = await test.step("Получить тренировки в расписании по заданным параметрам", async () => {        
            const parameters = {...await getBaseParameters(),...{group_training_id: groupTrainingId, club_id: clubId, date_from: date_from, date_to: date_to}};
            const groupTrainingTimeTablesResponse = (await new GroupTrainingTimeTablesRequests(request).getGroupTrainingTimeTables(200, parameters)).json();
            return groupTrainingTimeTablesResponse;
        });
        await test.step("Проверить схему ответа", async () => {
            await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
            await expect(validateJson(getGroupTrainingTimeTableJsonSchema, response)).resolves.toBeTruthy();
        });
        await test.step("Проверить наличие созданной тренировки в выборке запроса", async () => {
            const allIds = response.data.map((item: {id: number}) => item.id);
            await expect(allIds).toContain(group_training_time_table_id);
        });

    });      
});