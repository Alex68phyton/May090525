import { JSONSchemaType } from "ajv";

export interface CreateGroupTrainingTimeTableResponseJson {
    group_training_time_table_id: number,
    parent_id: number
}

export const createGroupTrainingTimeTableJsonSchema: JSONSchemaType<CreateGroupTrainingTimeTableResponseJson> = {
    type: "object",
    properties: {
    group_training_time_table_id: { type: "number" },
    parent_id: { type: "number" }
},
required: [
    "group_training_time_table_id",
    "parent_id"
],
additionalProperties: false
}