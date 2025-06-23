import { APIResponse } from "@playwright/test";
import BaseRequest from "./baseRequests.request";
import api from '../api.json';

export default class VerifyRequest extends BaseRequest {

    async postGetCode(status: number, requestData: any): Promise<APIResponse> {
        return (await this.post(`${this.baseUrl}${api.paths.get_code}`, status, requestData));
    }
}