import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class DiscountsRequests extends BaseRequest {
    async getDiscounts(status: number, parameters: object): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.discounts}`, status, parameters);
    }

        async postDiscounts(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.discounts}`, status, body);
    }
}