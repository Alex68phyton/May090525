import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UserPaymentCreateRequests extends BaseRequest {
    async postUserPaymentCreate(status: number, body: any): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.paymentCreate}`, status, body);
    }
}