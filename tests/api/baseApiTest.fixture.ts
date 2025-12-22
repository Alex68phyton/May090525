import { mergeTests, test as BaseTest } from "@playwright/test";

const test = mergeTests(BaseTest.extend<{
    clubId: number,
    clubZoneId: number,
    userId: number,
    userPhone: string,
    groupTrainingId: number
}>({
    clubId: Number(process.env.CLUB_ID),
    clubZoneId: Number(process.env.CLUB_ZONE_ID),
    userId: Number(process.env.USER_ID),
    userPhone: process.env.USER_PHONE,
    groupTrainingId: Number(process.env.GROUP_TRAINING_ID)
})
)
export default test;
export const expect = test.expect;