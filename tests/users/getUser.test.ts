import { expect, request, test } from "@playwright/test";
import api from '../../api.json'
import { log } from "../../utils/logger";
import { getBaseParameters } from "../../entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "../../utils/random";
import ClubsRequests from "../../requests/clubs.requests";
import UsersRequests from "../../requests/users.request";



test.describe("API-тесты на получение юзера", async () => {
    test.only("[positive] получение юзера по id", async ({request}) => {
            const clubId = await test.step("Получить id клуба", async () => {
                        const parameters = {...await getBaseParameters()};
                        const getClubResponse = await new ClubsRequests(request).getClubs(200, parameters);
                        const getClubsData = await getClubResponse.json();
                        return getClubsData?.data[0]?.id;
                    });
            
            const userId = await test.step("Получить id клиента", async () => {     
                const requestBody = {
                            session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                            request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d99",
                            request_source: "crm",
                            data: {
                                email: getRandomEmail(),
                                name: "Кваква",
                                last_name: "Качественная",
                                middle_name: "Проверка",
                                sex: "female",
                                phone: getRandomPhoneNumber(),
                                birthday: "1991-11-11",
                                password: "ForAlex2023",
                                lang: "ru",
                                home_club_id: clubId,
                                club_access: false,
                                admin_panel_access: true,
                                group_training_registration_access: false,
                                sport_experience: "Больше 5 лет"
                            }
                    };
                const response = (await (await new UsersRequests(request).postUsers(200, requestBody)).json()).data;
                return response.id
            });

            const response = await test.step("Получить информацию о клиенте", async () => { 
                const parameters = {...await getBaseParameters()};
                const getUserResponse = await new UsersRequests(request).getUserById(200, parameters, userId);
                const getUserData = await getUserResponse.json();
                return getUserData?.data.id;       
            })

            await test.step("Проверки", async () => {
            expect(response).toEqual(userId);
        })
            
    });
         
});