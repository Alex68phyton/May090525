import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import { BaseRequestJson } from "./base.requestJson";

export interface EditUserPaymentPlanDataRequestJson {
        id: number;
        status: string;
}

export const getEditUserPaymentPlanRequestJson = async (uppId: number, status: string): Promise<BaseRequestJson<EditUserPaymentPlanDataRequestJson[]>> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        data: [{
            id: uppId,
            status: status
        }]
    }
}