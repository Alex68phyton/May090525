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
    async deleteGroupTrainingTimeTables(status: number, parameters: object, group_training_time_table_id: number): Promise<APIResponse> {
        return await this.delete(`${this.baseUrl}${api.paths.group_training_time_table}/${group_training_time_table_id}`, status, parameters);
    }
    async changeGroupTrainingTimeTables(status: number, body: object, group_training_time_table_id: number): Promise<APIResponse> {
        return await this.post(`${this.baseUrl}${api.paths.group_training_time_table}/${group_training_time_table_id}/change`, status, body);
    }
}