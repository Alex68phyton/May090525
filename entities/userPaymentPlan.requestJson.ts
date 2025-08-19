import userPaymentPlanTestData from "@data/userPaymentPlan.json";
import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import { getCurrentSplitDate } from "@utils/getAnyDate";

export interface UserPaymentPlanDataRequestJson {
        session_id: string,
        request_id: string,
        request_source: string,
        start_date: string;
        payment_plan_id: number;
        club_id: number;
        verification_token: string;
        discount_id: number
}

export const getUserPaymentPlanRequestJson = async (clubId: number): Promise<UserPaymentPlanDataRequestJson> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        start_date: getCurrentSplitDate(),
        payment_plan_id: userPaymentPlanTestData.payment_plan_id,
        club_id: clubId,
        verification_token: userPaymentPlanTestData.verification_token,
        discount_id: userPaymentPlanTestData.discount_id
    }
}