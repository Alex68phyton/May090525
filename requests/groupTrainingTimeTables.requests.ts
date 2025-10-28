import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class GroupTrainingTimeTablesRequests extends BaseRequest {
    async postGroupTrainingTimeTables(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.group_training_time_table}`, status, body);
    }
    async getGroupTrainingTimeTables(status: number, parameters: object): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.group_training_time_table}`, status, parameters);
    }
}