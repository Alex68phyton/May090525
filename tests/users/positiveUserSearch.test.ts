import { APIRequestContext, expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import { Statuses } from "libs/statuses";
import UserSearchRequests from "@requests/userSearch.request";



test.describe("API-тесты на поиск клиента", async () => {

    let clubId: number;
    let userId: number;
    const birthday = "1991-11-11";
    const name = "Кваква";
    const last_name = "Качественная"


    const userSearchResponse = async (request: APIRequestContext, searchData: Object) => {
            const requestBody = {
                session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                request_source: "mobile_app",
                data: searchData
                }
    
            const userSearchResponse = (await (await new UserSearchRequests(request).postUserSearch(Statuses.OK, requestBody)).json());
            
            return userSearchResponse;
        }
    

    test.beforeAll( async({request}) => {
        clubId = await test.step("Получить id клуба", async () => {
            const parameters = {...await getBaseParameters()};
            const getClubResponse = await new ClubsRequests(request).getClubs(Statuses.OK, parameters);
            const getClubsData = await getClubResponse.json();
            return getClubsData?.data[0]?.id;
        });

        const { email, phoneId } = await test.step("Получить id клиента", async () => {     
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
            const response = (await (await new UsersRequests(request).postUsers(Statuses.OK, requestBody)).json()).data;
            return {
                email: response.email,
                phoneId: response.phone
            }
        });

        const PhoneSearchData = {
            phone: phoneId
        };
        const BirthdaySearchData = {
            name: name,
            last_name: last_name,
            birthday: birthday
        };
        const EmailSearchData = {
            name: name,
            last_name: last_name,
            email: email
        };

        test.only("поиск клиента по номеру телефона", async ({request}) => {
                const userSearchSuccessResponse = await test.step("поиск клиента по номеру телефона", 
                async () => userSearchResponse(request, PhoneSearchData));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.name).toEqual("Кваква");
            });
                
        });

        test("поиск клиента по имени, фамилии и дате рождения", async ({request}) => {
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и дате рождения", 
                async () => userSearchResponse(request, BirthdaySearchData));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.name).toEqual("Кваква");
            });
                
        });

        test("поиск клиента по имени, фамилии и email", async ({request}) => {
                const userSearchSuccessResponse = await test.step("поиск клиента по имени, фамилии и email", 
                async () => userSearchResponse(request, EmailSearchData));     

                await test.step("Проверить статус транзакции", async () => {
                    expect(userSearchSuccessResponse.name).toEqual("Кваква");
            });
                
        });


    });
});
