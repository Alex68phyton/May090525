import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class CardsTokensRequests extends BaseRequest {
    async getCardTokens(status: number, parameters: object): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.card_tokens}`, status, parameters);
    }
}