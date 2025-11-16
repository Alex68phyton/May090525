import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import { getCurrentDatePlus7Days, getDatePlus7DaysAnd1Hour } from "@utils/getAnyDate";
import { BaseRequestJson } from "./base.requestJson";

export interface changeGroupTrainingTimeTableDataRequestJson {
        group_training_id: number | null;
        start_time: string | null;
        end_time: string | null;
        club_zone_id: number | null;
        employee_id: number | null;
        count_seats: number | null;
        include_repeats: boolean | null;
}

export const getChangeGroupTrainingTimeTableRequestJson = async (): Promise<BaseRequestJson<changeGroupTrainingTimeTableDataRequestJson>> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        data: {
        group_training_id: null,    
        start_time: getCurrentDatePlus7Days(),
        end_time: getDatePlus7DaysAnd1Hour(),
        club_zone_id: null,
        employee_id: 2549,
        count_seats: 20,
        include_repeats: false
        }
    }
}