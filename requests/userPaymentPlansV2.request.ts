import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UserPaymentPlansV2Requests extends BaseRequest {
    async postUserPaymentPlansV2(status: number, body: object, userId: number): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.v2}${api.paths.users.users}/${userId}${api.paths.user_payment_plans.user_payment_plans}`, status, body);
    }
}