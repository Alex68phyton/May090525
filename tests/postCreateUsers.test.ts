import { expect, request, test } from "@playwright/test";
import api from '../api.json'
import { getRandomEmail, getRandomPhoneNumber } from "../utils/random";

const sportExperience = [
    "0-6 месяцев",
    "6-12 месяцев",
    "1-2 года"
]

test.describe("API-тесты на создание клиентов", async () => {
    test("[positive] создание клиента", async ({request}) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.users}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: {
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
                            home_club_id: 1,
                            club_access: false,
                            admin_panel_access: true,
                            group_training_registration_access: false,
                            sport_experience: "Больше 5 лет"
                        }
                }
            }
        );

        expect(response.status()).toEqual(200);
    });
sportExperience.forEach(experience => {
    test(`[positive] создание клиента без пароля с опытом ${experience}`, async ({request}) => {
        const response = await request.post(
            `${api.urls.base_url_api}${api.paths.users}`,
            {
                headers: {
                    "Authorization": `${api.tokens.test}`
                },
                data: {
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
                            home_club_id: 1,
                            club_access: false,
                            admin_panel_access: true,
                            group_training_registration_access: false,
                            sport_experience: experience
                        }
                }
            }
        );
        
        expect(response.status()).toEqual(200);
    });
});
});