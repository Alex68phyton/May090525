import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UserBlockRequests extends BaseRequest {
    async postUserBlock(status: number, body: object, userId: number): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.users}/${userId}/block`, status, body);
    }
}