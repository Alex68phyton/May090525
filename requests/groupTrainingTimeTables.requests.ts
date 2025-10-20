import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class GroupTrainingTimeTablesCreateRequests extends BaseRequest {
    async postGroupTrainingTimeTables(status: number, body: object): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.group_training_time_table}`, status, body);
    }
}