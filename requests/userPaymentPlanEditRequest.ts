import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UserPaymentPlanEditRequests extends BaseRequest {
    async postUserPaymentPlanEdit(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.user_payment_plans.user_payment_plans}${api.paths.user_payment_plans.edit}`, status, body);
    }
}