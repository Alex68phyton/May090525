import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UserPaymentPlansRequests extends BaseRequest {
    async postUserPaymentPlans(status: number, body: object, userId: number): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.users.users}/${userId}${api.paths.users.user_payment_plans}`, status, body);
    }
}