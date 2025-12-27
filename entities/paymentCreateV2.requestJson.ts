import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import api from '../api.json'

export interface PaymentCreateV2DataRequestJson {
    session_id: string;
    request_id: string;
    request_source: string;
    provider_id: number;
    related_user_payment_plans: [number];
    gate_id: number;
    user_id: number;
    user_payment_plan_id: number | null;
    currency: string;
    payment_service_id: number | null;
    employee_id: number | null;
    fiscal_method: string;
    widget_settings: {
        success_page: string | null;
        fault_page: string | null;
    } | null;
}

export const getPaymentCreateV2RequestJson = async (userId: number, userPaymentPlanId: number, paymentServiceId: number, userPaymentPlanSecondId: number): Promise<PaymentCreateV2DataRequestJson> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        provider_id: 20,
        gate_id: 3,
        user_id: userId,
        related_user_payment_plans: [userPaymentPlanSecondId],
        user_payment_plan_id: userPaymentPlanId,
        currency: "RUB",
        payment_service_id: paymentServiceId,
        employee_id: 2549,
        fiscal_method: "OrangeData",
        widget_settings: {
            success_page: api.urls.widget_settings.success_page,
            fault_page: api.urls.widget_settings.fault_page
        }
    }
}