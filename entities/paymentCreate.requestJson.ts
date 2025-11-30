import { RequestSources } from "@libs/requestSources";
import requestTestData from "@data/request.json";
import api from '../api.json'

export interface PaymentCreateDataRequestJson {
    session_id: string;
    request_id: string;
    request_source: string;
    provider_id: number;
    type: string;
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

export const getPaymentCreateRequestJson = async (userId: number, userPaymentPlanId: number, paymentServiceId: number): Promise<PaymentCreateDataRequestJson> => {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM,
        provider_id: 6,
        type: "payment",
        gate_id: 3,
        user_id: userId,
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