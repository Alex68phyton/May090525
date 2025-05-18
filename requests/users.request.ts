import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class UsersRequests extends BaseRequest {
    async postUsers(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.users}`, status, body);
    }

    async getUserById(status: number, parameters: object, userId: number): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.users}/${userId}`, status, parameters);
    }
}