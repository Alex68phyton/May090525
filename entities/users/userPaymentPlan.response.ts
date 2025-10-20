import { JSONSchemaType } from "ajv";

export interface CreateUserPaymentPlanDataResponseJson {
    id: number,
    user_id: number,
    signed_date: string,
    start_date: string,
    status: string,
    payment_plan: object,
    club: object,
    discount_id: number,
    discount_code_id: number
}

export interface PaymentPlanDataResponseJson {
    id: number,
    name: string,
    payment_plan_type: string,
    currency_code: string,
    our_join_fee: number,
    partner_join_fee: number,
    membership_fee: number,
    is_recurrent: boolean,
    is_multi_club_access: boolean,
    is_spa_access: boolean,
    payment_interval: number,
    interval_type: string,
    is_group_training_access: boolean,
    is_fitness_access: boolean
}

export interface UserPaymentPlanClubDataResponseJson {
    id: number,
    name: string,
    open_date_: string
}

export const createUserPaymentPlanDataResponseJsonSchema: JSONSchemaType<CreateUserPaymentPlanDataResponseJson> = {
    type: "object",
    properties: {
    id: { type: "number" },
    user_id: { type: "number" },
    signed_date: { type: "string" },
    start_date: { type: "string" },
    status: { type: "string" },
    payment_plan: { type: "object" },
    club: { type: "object" },
    discount_id: { type: "number" },
    discount_code_id: { type: "number" }
},
required: [
    "id",
    "user_id",
    "signed_date",
    "start_date",
    "status",
    "payment_plan",
    "club",
    "discount_id"
],
additionalProperties: false
}

export const paymentPlanDataResponseJsonSchema: JSONSchemaType<PaymentPlanDataResponseJson> = {
    type: "object",
    properties: {
    id: { type: "number" },
    name: { type: "string" },
    payment_plan_type: { type: "string" },
    currency_code: { type: "string" },
    our_join_fee: { type: "number" },
    partner_join_fee: { type: "number" },
    membership_fee: { type: "number" },
    is_recurrent: { type: "boolean" },
    is_multi_club_access: { type: "boolean" },
    is_spa_access: { type: "boolean" },
    payment_interval: { type: "number" },
    interval_type: { type: "string" },
    is_group_training_access: { type: "boolean"},
    is_fitness_access: { type: "boolean"}
},
required: [
    "id",
    "name",
    "payment_plan_type",
    "currency_code",
    "our_join_fee",
    "partner_join_fee",
    "membership_fee",
    "is_recurrent",
    "is_multi_club_access",
    "is_spa_access",
    "payment_interval",
    "interval_type",
    "is_group_training_access",
    "is_fitness_access"
],
additionalProperties: false
}

export const clubDataResponseJsonSchema: JSONSchemaType<UserPaymentPlanClubDataResponseJson> = {
    type: "object",
    properties: {
    id: { type: "number" },
    name: { type: "string" },
    open_date_: { type: "string" }
},
required: [
    "id",
    "name",
    "open_date_"
],
additionalProperties: false
}