import { JSONSchemaType } from "ajv";

interface CardTokensJson {
  id: number;
  user_id: number;
  payment_service_id: number;
  public_card_number: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export const cardTokensResponseJsonSchema: JSONSchemaType<CardTokensJson> = {
  type: "object",
        properties: {
          id: {
            type: "number"
          },
          user_id: {
            type: "number"
          },
          payment_service_id: {
            type: "number"
          },
          public_card_number: {
            type: "string"
          },
          created_at: {
            type: "string"
          },
          updated_at: {
            type: "string"
          },
          is_deleted: {
            type: "boolean"
          }
        },
        required: [
          "id",
          "user_id",
          "payment_service_id",
          "public_card_number",
          "created_at",
          "updated_at",
          "is_deleted"
        ],
        additionalProperties: false
}
