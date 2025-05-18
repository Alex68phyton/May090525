import { expect, request, test } from "@playwright/test";
import api from '../api.json'
import { log } from "../utils/logger";
import { getBaseParameters } from "../entities/baseParameters";
import { getRandomEmail, getRandomPhoneNumber } from "../utils/random";
import ClubsRequests from "../requests/clubs.requests";
import UsersRequests from "../requests/users.request";



test.describe("API-тесты на получение юзера", async () => {
    test.only("[positive] получение юзера по id", async ({request}) => {
            const clubId = await new ClubsRequests(request).getClubs(200, await getBaseParameters());
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
                            home_club_id: (await clubId.json()).data[0].id,
                            club_access: false,
                            admin_panel_access: true,
                            group_training_registration_access: false,
                            sport_experience: "Больше 5 лет"
                        }
                };
            const createUser = await new UsersRequests(request).postUsers(200, requestBody);
            const response = await new UsersRequests(request).getUserById(200, await getBaseParameters(), (await createUser.json()).data.id);
            expect((await response.json()).data.id).toEqual((await createUser.json()).data.id);
            expect((await response.json()).data.home_club_id).toEqual((await clubId.json()).data[0].id);
    });
         
});