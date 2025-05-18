import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class AccessCardsRequests extends BaseRequest {
    async postAccessCards(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.access_cards}`, status, body);
    }

    async getAccessCardsById(status: number, parameters: object, accessCardId: number): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.access_cards}/${accessCardId}`, status, parameters);
    }
}