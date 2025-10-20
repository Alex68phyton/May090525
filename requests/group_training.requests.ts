import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class GroupTrainingRequests extends BaseRequest {
    async getGroupTrainings(status: number, parameters: object): Promise<APIResponse> {
        return await this.get(`${this.baseUrl}${api.paths.group_trainings}`, status, parameters);
    }
}