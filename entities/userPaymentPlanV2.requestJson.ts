import userPaymentPlanTestData from "@data/userPaymentPlan.json";
import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import { getCurrentSplitDate } from "@utils/getAnyDate";

export interface UserPaymentPlanDataRequestJson {
    session_id: string,
    request_id: string,
    request_source: string,        
    verification_token: string;
    data: PaymentPlanDataRequestJson[];
}

export interface PaymentPlanDataRequestJson {
    start_date: string;
    payment_plan_id: number;
    club_id: number;
}

export const getPaymentPlanDataFirstRequestJson = async (clubId: number): Promise<PaymentPlanDataRequestJson> => {
    return {
        start_date: getCurrentSplitDate(),
        payment_plan_id: userPaymentPlanTestData.payment_plan_id,
        club_id: clubId
    }
}

export const getPaymentPlanDataSecondRequestJson = async (): Promise<PaymentPlanDataRequestJson> => {
    return {
        start_date: getCurrentSplitDate(),
        payment_plan_id: userPaymentPlanTestData.second_payment_plan,
        club_id: userPaymentPlanTestData.club_id
    }
}

export const getUserPaymentPlanRequestJson = async (clubId: number): Promise<UserPaymentPlanDataRequestJson> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,        
        verification_token: userPaymentPlanTestData.verification_token,
        data: [await getPaymentPlanDataFirstRequestJson(clubId), await getPaymentPlanDataSecondRequestJson()]
    }
}