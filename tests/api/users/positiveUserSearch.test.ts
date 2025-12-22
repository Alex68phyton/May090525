import { APIRequestContext } from "@playwright/test";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import UsersRequests from "@requests/users.request";
import { Statuses } from "@libs/statuses";
import {  RequestSources } from "@libs/requestSources";
import UserSearchRequests from "@requests/userSearch.request";
import userTestData from "@data/user.json";
import requestTestData from "@data/request.json";
import { getUserRequestJson } from "@entities/users/user.requestJson";
import test, { expect } from "../baseApiTest.fixture";


test.describe("API-тесты на поиск клиента", async () => {

    let phoneId: string;
    let email: string;


    const userSearchResponse = async (request: APIRequestContext, searchData: Object) => {
            const requestBody = {
                session_id: requestTestData.sessionId,
                request_id: requestTestData.requestId,
                request_source: RequestSources.CRM,
                data: searchData
                }
    
            const userSearchResponse = (await (await new UserSearchRequests(request).postUserSearch(Statuses.OK, requestBody)).json());
            
            return userSearchResponse;
        }
    

    test.beforeAll( async({request, clubId}) => {

        const response = await test.step("Получить id клиента", async () => {     
            const requestBody = await getUserRequestJson(clubId, getRandomEmail(), getRandomPhoneNumber());
            return (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json()).data;
        });
            email = response.email,
            phoneId = response.phone
    });
        test("поиск клиента по номеру телефона", async ({request}) => {
                const PhoneSearchData = {
                    phone: phoneId
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по номеру телефона", 
                async () => userSearchResponse(request, PhoneSearchData));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.data[0].name).toEqual(userTestData.first_name);
            });
                
        });

        test("поиск клиента по имени, фамилии и дате рождения", async ({request}) => {
                const BirthdaySearchData = {
                    name: userTestData.first_name,
                    last_name: userTestData.last_name,
                    birthday: userTestData.birthday
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и дате рождения", 
                async () => userSearchResponse(request, BirthdaySearchData));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.data[0].name).toEqual(userTestData.first_name);
            });
                
        });

        test("поиск клиента по имени, фамилии и email", async ({request}) => {
                const EmailSearchData = {
                    name: userTestData.first_name,
                    last_name: userTestData.last_name,
                    email: email
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и email", 
                async () => userSearchResponse(request, EmailSearchData));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.data[0].name).toEqual(userTestData.first_name);
            });
                
        });
});