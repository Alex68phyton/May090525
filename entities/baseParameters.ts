import requestTestData from "@data/request.json"
import { RequestSources } from "@libs/requestSources"

export async function getBaseParameters() {
    return {
        session_id: requestTestData.sessionId,
        request_id: requestTestData.requestId,
        request_source: RequestSources.CRM
    }
}