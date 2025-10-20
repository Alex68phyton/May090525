import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import ClubsRequests from "@requests/clubs.requests";
import { baseResponseJsonSchema } from "@entities/base.response";
import { validateJson } from "@utils/validator.util";
import GroupTrainingRequests from "@requests/group_training.requests";
import { getGroupTrainingTimeTableRequestJson } from "@entities/groupTrainingTimeTable.requestJson";
import GroupTrainingTimeTablesCreateRequests from "@requests/groupTrainingTimeTables.requests";



test.describe("API-тесты на создание тренировок в расписании", async () => {
    test("[positive] создание тренировки без повтора", async ({request}) => {

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

            const response = await test.step("Создать тренировку в расписании", async () => { 
                const requestBody = await getGroupTrainingTimeTableRequestJson(groupTrainingId, clubId, clubZone);

            const getGTTTResponse = (await (await new GroupTrainingTimeTablesCreateRequests(request).postGroupTrainingTimeTables(200, requestBody)).json());
            return getGTTTResponse;       
            });

            await test.step("Проверить схему ответа", async () => {
                await expect(validateJson(baseResponseJsonSchema, response)).resolves.toBeTruthy();
            });
                    
    });
         
});
