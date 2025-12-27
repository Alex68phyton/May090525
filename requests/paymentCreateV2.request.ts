import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UserPaymentCreateV2Requests extends BaseRequest {
    async postUserPaymentCreateV2(status: number, body: any): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.v2}${api.paths.paymentCreate}`, status, body);
    }
}