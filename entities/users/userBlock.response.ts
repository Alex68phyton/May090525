import { JSONSchemaType } from "ajv";

export interface UserBlockDataResponseJson {
  employee_id: number;
  name: string;
  last_name: string;
  user: UserJson;
  notes: NoteJson;
}

export interface UserJson {
  id: number;
  name: string;
  last_name: string;
  club_access: boolean;
}

export interface NoteJson {
  id: number;
  text: string;
  type: string;
  created_at: string;
  is_deleted: boolean;
}

export const userBlockDataJsonSchema: JSONSchemaType<UserBlockDataResponseJson> = {
  type: "object",
  properties: {
    employee_id: { type: "number" },
    name: { type: "string" },
    last_name: { type: "string" },
    user: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        last_name: { type: "string" },
        club_access: { type: "boolean" }
      },
      required: ["id", "name", "last_name", "club_access"],
      additionalProperties: false
    },
    notes: {
      type: "object",
      properties: {
        id: { type: "number" },
        text: { type: "string" },
        type: { type: "string" },
        created_at: { type: "string" },
        is_deleted: { type: "boolean" }
      },
      required: ["id", "text", "type", "created_at", "is_deleted"],
      additionalProperties: false
    }
  },
  required: ["employee_id", "name", "last_name", "user", "notes"],
  additionalProperties: false
};