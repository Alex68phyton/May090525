import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import { getCurrentDatePlus7Days, getDatePlus7DaysAnd1Hour } from "@utils/getAnyDate";
import { BaseRequestJson } from "./base.requestJson";

export interface groupTrainingTimeTableDataRequestJson {
        group_training_id: number
        start_time: string;
        end_time: string;
        club_id: number;
        club_zone_id: number
        employee_id: number;
        count_seats: number;
        is_repeat: boolean;
        repeat_rule: string;
}

export const getGroupTrainingTimeTableRequestJson = async (groupTrainingId: number, clubId: number, clubZoneId: number): Promise<BaseRequestJson<groupTrainingTimeTableDataRequestJson>> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        data: {
        group_training_id: groupTrainingId,    
        start_time: getCurrentDatePlus7Days(),
        end_time: getDatePlus7DaysAnd1Hour(),
        club_id: clubId,
        club_zone_id: clubZoneId,
        employee_id: 2549,
        count_seats: 15,
        is_repeat: false,
        repeat_rule: "w"
        }
    }
}