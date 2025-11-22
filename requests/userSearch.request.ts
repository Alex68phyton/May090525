import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UserSearchRequests extends BaseRequest {
    async postUserSearch(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.users.users}${api.paths.users.search}`, status, body);
    }
}