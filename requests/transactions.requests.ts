import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class TransactionsRequests extends BaseRequest {
    async getTransactions(status: number, parameters: object): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.transactions}`, status, parameters);
    }
}