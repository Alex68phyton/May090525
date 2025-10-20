import { APIRequestContext, expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import { Statuses } from "libs/statuses";
import UserSearchRequests from "@requests/userSearch.request";
import userTestData from "@data/user.json";
import requestTestData from "@data/request.json";
import { RequestSources } from "@libs/requestSources";
import { getUserRequestJson } from "@entities/users/user.requestJson";


test.describe("[negative]API-тесты на поиск клиента", async () => {

    let clubId: number;

    const userSearchResponse = async (request: APIRequestContext, searchData: Object, status: Statuses) => {
            const requestBody = {
                session_id: requestTestData.sessionId,
                request_id: requestTestData.requestId,
                request_source: RequestSources.CRM,
                data: searchData
                }
    
            const userSearchResponse = (await (await new UserSearchRequests(request).postUserSearch(status, requestBody)).json());
            
            return userSearchResponse;
        }
    

    test.beforeAll( async({request}) => {
        clubId = await test.step("Получить id клуба", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const response = await test.step("Получить id клиента", async () => {     
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
            return (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json()).data;
        });
    });

        test("поиск клиента по номеру телефона, которого нет в БД", async ({request}) => {
                const PhoneSearchData = {
                    phone: "+7920493"
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по номеру телефона", 
                async () => userSearchResponse(request, PhoneSearchData, Statuses.NOT_FOUND));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.error.message).toEqual("user not found");
            });
                
        });

        test("[negative]поиск клиента по имени, дате рождения, но без фамилии", async ({request}) => {
                const BirthdaySearchData = {
                    name: userTestData.first_name,
                    birthday: userTestData.birthday
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и дате рождения", 
                async () => userSearchResponse(request, BirthdaySearchData, Statuses.BAD_REQUEST));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.error.message).toEqual("search parameters not presented in request");
            });
                
        });

        test("[negative]поиск клиента по номеру телефона, которого нет в БД", async ({request}) => {
                const EmailSearchData = {
                    name: userTestData.first_name,
                    last_name: userTestData.last_name,
                    email: "takogoemailnetu"
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и email", 
                async () => userSearchResponse(request, EmailSearchData, Statuses.NOT_FOUND));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.error.message).toEqual("user not found");
            });
                
        });
});