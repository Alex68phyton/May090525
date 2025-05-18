import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class ClubsRequests extends BaseRequest {
    async getClubs(status: number, parameters: object): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.clubs}`, status, parameters);
    }
}