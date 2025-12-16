import { JSONSchemaType } from "ajv";

export interface UserPaymentPlanEditDataResponseJson {
  id: number;
  user_id: number;
  payment_plan_id: number;
  club_id: number;
  signed_date: string;
  start_date: string;
  end_date: string | null;
  pay_date: string | null;
  cancel_date: string | null;
  status: string;
  previous_status: string | null;
  card_token_id: number | null;
  created_at: string;
  updated_at: string;
}


export const userPaymentPlanEditDataResponseJsonSchema: JSONSchemaType<UserPaymentPlanEditDataResponseJson> = {
    type: "object",
        properties: {
        id: { type: "number" },
        user_id: { type: "number" },
        payment_plan_id: { type: "number" },
        club_id: { type: "number" },
        signed_date: { type: "string" },
        start_date: { type: "string" },
        end_date: { type: "string" },
        pay_date: { type: "string" },
        cancel_date: { type: "string" },
        status: { type: "string" },
        previous_status: { type: "string" },
        card_token_id: { type: "number" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
        },
        required: [
        "id",
        "user_id",
        "payment_plan_id",
        "club_id",
        "signed_date",
        "start_date",
        "status",
        "created_at",
        "updated_at"
        ],
        additionalProperties: false
}