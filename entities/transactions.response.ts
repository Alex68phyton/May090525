import { JSONSchemaType } from "ajv";

interface ProviderSchema {
  id: number;
  name: string;
  payment_method_type: number;
  receipt_operation_type: number;
  receipt_close_payment_type: number;
  description: string;
  is_fiscal: boolean;
  is_deposit: boolean;
}

interface GateSchema {
  id: number;
  name: string;
}

interface UserSchema {
  id: number;
  first_name: string;
  last_name: string;
}

interface DiscountSchema {
  id: number;  
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

interface PaymentServiceSchema {
  id: number;
  name: string;
}

interface ReceiptSchema {
  id: number;
  fiscal_status: string;
}

interface EmployeeUserSchema {
  id: number;
  name: string;
  last_name: string;
}

interface EmployeeSchema {
  id: number;
  user: EmployeeUserSchema;
}

interface PaymentDataSchema {
  id: number;
  provider: ProviderSchema;
  type: string;
  gate: GateSchema;
  user: UserSchema;
  user_payment_plan_id: number;
  discount: DiscountSchema;
  our_amount: number;
  partner_amount: number;
  deposit_amount: number;
  discount_amount: number;
  total_amount: number;
  membership_fee: number;
  join_fee: number;
  currency: string;
  payment_service: PaymentServiceSchema;
  supp_transaction_id: string;
  card_token_id: number;
  description: string;
  status: string;
  receipt: ReceiptSchema;
  fiscal_method: string;
  payment_transaction_id: number;
  public_card_number: string;
  created_at: string;
  updated_at: string;
  employee: EmployeeSchema;
  response_code: number;
  refund_balance: number;
}

interface TransactionResponseSchema {
  session_id: string;
  request_id: string;
  total_rows: number;
  data: PaymentDataSchema[];
  
}

export const transactionResponseSchema: JSONSchemaType<TransactionResponseSchema> = {
  type: "object",
  properties: {
    session_id: {
      type: "string"
    },
    request_id: {
      type: "string"
    },
    total_rows: { type: "number"},
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          provider: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              payment_method_type: { type: "number" },
              receipt_operation_type: { type: "number" },
              receipt_close_payment_type: { type: "number" },
              description: { type: "string" },
              is_fiscal: { type: "boolean" },
              is_deposit: { type: "boolean" }
            },
            required: ["id", "name", "payment_method_type", "receipt_operation_type", "receipt_close_payment_type", "description", "is_fiscal", "is_deposit"],
            additionalProperties: false
          },
          type: { type: "string" },
          gate: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" }
            },
            required: ["id", "name"],
            additionalProperties: false
          },
          user: {
            type: "object",
            properties: {
              id: { type: "number" },
              first_name: { type: "string" },
              last_name: { type: "string" }
            },
            required: ["id", "first_name", "last_name"],
            additionalProperties: false
          },
          user_payment_plan_id: { type: "number" },
          discount: {
            type: "object",
            properties: {
              id: { type: "number" },  
              name: { type: "string" },
              start_date: { type: "string" },
              end_date: { type: "string" },
              is_active: { type: "boolean" }
            },
            required: ["id"],
            additionalProperties: false
          },
          our_amount: { type: "number" },
          partner_amount: { type: "number" },
          deposit_amount: { type: "number" },
          discount_amount: { type: "number" },
          total_amount: { type: "number" },
          membership_fee: { type: "number" },
          join_fee: { type: "number" },
          currency: { type: "string" },
          payment_service: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" }
            },
            required: ["id", "name"],
            additionalProperties: false
          },
          supp_transaction_id: { type: "string" },
          card_token_id: { type: "number" },
          description: { type: "string" },
          status: { type: "string" },
          receipt: {
            type: "object",
            properties: {
              id: { type: "number" },
              fiscal_status: { type: "string" }
            },
            required: ["id", "fiscal_status"],
            additionalProperties: false
          },
          fiscal_method: { type: "string" },
          payment_transaction_id: { type: "number" },
          public_card_number: { type: "string" },
          created_at: { type: "string" },
          updated_at: { type: "string" },
          employee: {
            type: "object",
            properties: {
              id: { type: "number" },
              user: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  last_name: { type: "string" }
                },
                required: ["id"],
                additionalProperties: false
              }
            },
            required: ["id"],
            additionalProperties: false
          },
          response_code: { type: "number" },
          refund_balance: { type: "number" }
        },
        required: [
          "id", "provider", "type", "gate", "user", "user_payment_plan_id", 
          "discount", "our_amount", "partner_amount", "deposit_amount", 
          "discount_amount", "total_amount", "membership_fee", "join_fee", 
          "currency", "payment_service", "supp_transaction_id", "card_token_id", 
          "description", "status", "fiscal_method", "payment_transaction_id", "created_at", "updated_at", "refund_balance"
        ],
        additionalProperties: false
      }
    },
  },
  required: ["session_id", "request_id", "data", "total_rows"],
  additionalProperties: false
};