import { expect, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import ClubsRequests from "@requests/clubs.requests";
import GroupTrainingRequests from "@requests/group_training.requests";
import { getGroupTrainingTimeTableRequestJson } from "@entities/groupTrainingTimeTable.requestJson";
import GroupTrainingTimeTablesRequests from "@requests/groupTrainingTimeTables.requests";
import { getChangeGroupTrainingTimeTableRequestJson } from "@entities/changeGroupTimeTables.requestJson";
import { selectGroupTrainingTimeTableById } from "db/groupTraining.db";



test.describe("API-тесты на изменение тренировок в расписании", async () => {
    let group_time_table_id: number;
    let groupTrainingId: number;
    let clubId: number;
    let clubZone: number;
    test.beforeEach( async ({request}) => {
        [clubId, clubZone] = await test.step("Получить id клуба и зону", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(200, parameters);
            const getClubsData = await getClubResponse.json();
                return [
                    getClubsData?.data[0]?.id,
                    getClubsData?.data[0]?.club_zones?.[0].id
                ];
                });
        groupTrainingId = await test.step("Получить id тренировки", async () => {
                    const parameters = {...await getBaseParameters()};
                    const getGTResponse = await new GroupTrainingRequests(request).getGroupTrainings(200, parameters);
                    const getGTData = await getGTResponse.json();
                    return getGTData?.data[0]?.id;
                });

        group_time_table_id = await test.step("Создать тренировку в расписании", async () => { 
            const requestBody = await getGroupTrainingTimeTableRequestJson(groupTrainingId, clubId, clubZone);
            const getGTTTResponse = (await (await new GroupTrainingTimeTablesRequests(request).postGroupTrainingTimeTables(200, requestBody)).json());
            return getGTTTResponse.data[0].group_training_time_table_id;       
        });                   
    });
    test.afterEach(async( {request} ) => {
        await test.step("Удалить тренировку из расписания", async () => {
            const parameters = {...await getBaseParameters()};
            await new GroupTrainingTimeTablesRequests(request).deleteGroupTrainingTimeTables(204, parameters, group_time_table_id);
        });
    });
    test("Изменение тренировки в расписании", async( {request} ) => {
        await test.step("Изменить кол-во мест в тренировке", async() => {
            const requestBody = await getChangeGroupTrainingTimeTableRequestJson();
            await new GroupTrainingTimeTablesRequests(request).changeGroupTrainingTimeTables(200, requestBody, group_time_table_id);
        });
        const countSeats = await test.step("Получить параметр кол-во мест из БД", async() => {
                return (await selectGroupTrainingTimeTableById(group_time_table_id)).count_seats;
        });
        await test.step("Проверить, что кол-во мест в бд соответствует переданному значению", async() => {
            expect(countSeats).toEqual(20);
        })
    });
});
