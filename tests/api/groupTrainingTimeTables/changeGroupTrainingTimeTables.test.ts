import { getBaseParameters } from "@entities/baseParameters";
import ClubsRequests from "@requests/clubs.requests";
import GroupTrainingRequests from "@requests/group_training.requests";
import { getGroupTrainingTimeTableRequestJson } from "@entities/groupTrainingTimeTable.requestJson";
import GroupTrainingTimeTablesRequests from "@requests/groupTrainingTimeTables.requests";
import { getChangeGroupTrainingTimeTableRequestJson } from "@entities/changeGroupTimeTables.requestJson";
import { selectGroupTrainingTimeTableById } from "db/groupTraining.db";
import test, { expect } from "../baseApiTest.fixture";



test.describe("API-тесты на изменение тренировок в расписании", async () => {
    let group_time_table_id: number;
    let groupTrainingId: number;
    test.beforeEach( async ({request, clubId, clubZoneId, groupTrainingId}) => {

        group_time_table_id = await test.step("Создать тренировку в расписании", async () => { 
            const requestBody = await getGroupTrainingTimeTableRequestJson(groupTrainingId, clubId, clubZoneId);
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
