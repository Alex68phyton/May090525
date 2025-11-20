import { BaseRequestJson } from "../base.requestJson";
import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";

export interface UserBlockRequestJson {
        note: NoteJson;
        club_access: boolean;
}

export interface NoteJson {
    text: string;
    employee_id: number;
}

export const getUserBlockRequestJson = async (): Promise<BaseRequestJson<UserBlockRequestJson>> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        data: {
            note: {
                text: "block",
                employee_id: 2549
            },
            club_access: false
                }
    }
}