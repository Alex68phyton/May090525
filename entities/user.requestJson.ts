import { SportExpirience } from "@libs/sportExpirience";
import { BaseRequestJson } from "./base.requestJson";
import userTestData from "@data/user.json";
import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";

export interface UserDataRequestJson {
        email: string;
        name: string;
        last_name: string;
        middle_name: string;
        sex: string;
        phone: string;
        birthday: string;
        password: string;
        lang: string;
        home_club_id: number;
        club_access: boolean;
        admin_panel_access: boolean;
        group_training_registration_access: boolean,
        sport_experience: string;
}

export const getUserRequestJson = async (clubId: number, email: string, phoneNumber: string): Promise<BaseRequestJson<UserDataRequestJson>> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        data: {
            email: email,
            name: userTestData.first_name,
            last_name: userTestData.last_name,
            middle_name: userTestData.middle_name,
            sex: userTestData.sex.male,
            phone: phoneNumber,
            birthday: userTestData.birthday,
            password: userTestData.password,
            lang: userTestData.lang.ru,
            home_club_id: clubId,
            club_access: false,
            admin_panel_access: true,
            group_training_registration_access: false,
            sport_experience: SportExpirience.ZERO_SIX_MONTH
                }
    }
}

