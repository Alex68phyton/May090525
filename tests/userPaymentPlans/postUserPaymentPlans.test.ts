import { expect, request, test } from "@playwright/test";
import { getBaseParameters } from "@entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";
import ClubsRequests from "@requests/clubs.requests";
import UsersRequests from "@requests/users.request";
import UserPaymentPlansRequests from "@requests/userPaymentPlans.request";
import { getCurrentDate } from "@utils/getPaymentStartDate";



test.describe("API-тесты на создание подписки юзера", async () => {
    test("[positive] создание подписки юзеру", async ({request}) => {
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

            const response = await test.step("Создать подписку юзеру", async () => { 
                const requestBody = {
                        session_id: "549297f8-e38a-47cd-915e-2a1859102539",
                        request_id: "4b5b7836-dce6-4b5e-9f18-76be91bd7d37",
                        request_source: "crm",
                        start_date: getCurrentDate(),
                        payment_plan_id: 18,
                        club_id: clubId,
                        verification_token: "e3767699-6a16-4da1-94b9-fa8ab9378fb4",
                        discount_id: 199
                    };

            const getUserPaymentPlanResponse = (await (await new UserPaymentPlansRequests(request).postUserPaymentPlans(200, requestBody, userId)).json()).data[0];
            return getUserPaymentPlanResponse.status;       
            })

            await test.step("Проверки", async () => {
            expect(response).toEqual("Created");
        })
            
    });
         
});