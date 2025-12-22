import { getBaseParameters } from "@entities/baseParameters";
import { getUserRequestJson } from "@entities/users/user.requestJson";
import { Statuses } from "@libs/statuses";
import { chromium } from "@playwright/test";
import ClubsRequests from "@requests/clubs.requests";
import GroupTrainingRequests from "@requests/group_training.requests";
import UsersRequests from "@requests/users.request";
import { getRandomEmail, getRandomPhoneNumber } from "@utils/random";

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const request = page.request;
    const userResponse = (await (await new UsersRequests(request).postUsers(Statuses.OK, await getUserRequestJson(Number(process.env.CLUB_ID), getRandomEmail(), getRandomPhoneNumber()))).json()).data;

    process.env['CLUB_ID'] = (await (await new ClubsRequests(request).getClubs(Statuses.OK, await getBaseParameters())).json()).data[0].id;
    process.env['CLUB_ZONE_ID'] = (await (await new ClubsRequests(request).getClubs(Statuses.OK, await getBaseParameters())).json()).data[0].club_zones?.[0].id;
    process.env['USER_ID'] = userResponse.id;
    process.env['USER_PHONE'] = userResponse.phone;
    process.env['GROUP_TRAINING_ID'] = (await (await new GroupTrainingRequests(request).getGroupTrainings(200, {...await getBaseParameters()})).json()).data[0].id;
}
export default globalSetup;