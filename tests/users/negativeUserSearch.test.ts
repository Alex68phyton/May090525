import { APIRequestContext, expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import { Statuses } from "libs/statuses";
import UserSearchRequests from "@requests/userSearch.request";



test.describe("[negative]API-тесты на поиск клиента", async () => {

    let clubId: number;
    let phoneId: string;
    let email: string;
    const birthday = "1991-11-11";
    const name = "Кваква";
    const last_name = "Качественная"


    const userSearchResponse = async (request: APIRequestContext, searchData: Object, status: Statuses) => {
            const requestBody = {
                session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                request_source: "mobile_app",
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
            const requestBody = {
                session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d99",
                request_source: "crm",
                data: {
                    email: getRandomEmail(),
                    name: name,
                    last_name: last_name,
                    middle_name: "Проверка",
                    sex: "female",
                    phone: getRandomPhoneNumber(),
                    birthday: birthday,
                    password: "ForAlex2023",
                    lang: "ru",
                    home_club_id: clubId,
                    club_access: false,
                    admin_panel_access: true,
                    group_training_registration_access: false,
                    sport_experience: "Больше 5 лет"
                }
            };
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
                    name: name,
                    birthday: birthday
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и дате рождения", 
                async () => userSearchResponse(request, BirthdaySearchData, Statuses.BAD_REQUEST));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.error.message).toEqual("search parameters not presented in request");
            });
                
        });

        test("[negative]поиск клиента по номеру телефона, которого нет в БД", async ({request}) => {
                const EmailSearchData = {
                    name: name,
                    last_name: last_name,
                    email: "takogoemailnetu"
                };
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и email", 
                async () => userSearchResponse(request, EmailSearchData, Statuses.NOT_FOUND));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.error.message).toEqual("user not found");
            });
                
        });
});