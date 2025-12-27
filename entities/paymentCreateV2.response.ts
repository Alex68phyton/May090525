import { JSONSchemaType } from "ajv";

export interface PaymentSchema {
  currency: string;
  payment_service_id: number;
  total_amount: number;
  payment_widget_uri: string;
  transactions: TransactionSchema[];
}

export interface TransactionSchema {
  id: number;
  parent_id: number;
  status: string;
  price: PriceSchema;
}

export interface PriceSchema {
  our_amount: number;
  partner_amount: number;
  discount_amount: number;
  deposit_amount: number;
  total_amount: number;
}

export const paymentCreateV2RequestJsonSchema: JSONSchemaType<PaymentSchema> = {
  type: 'object',
  properties: {
    currency: { type: 'string' },
    payment_service_id: { type: 'number' },
    total_amount: { type: 'number' },
    payment_widget_uri: { type: 'string' },
    transactions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          parent_id: { type: 'number' },
          status: { type: 'string' },
          price: {
            type: 'object',
            properties: {
              our_amount: { type: 'number' },
              partner_amount: { type: 'number' },
              discount_amount: { type: 'number' },
              deposit_amount: { type: 'number' },
              total_amount: { type: 'number' }
            },
            required: [
              'our_amount',
              'partner_amount', 
              'discount_amount',
              'deposit_amount',
              'total_amount'
            ]
          }
        },
        required: ['id', 'status', 'price']
      }
    }
  },
  required: [
    'currency',
    'payment_service_id',
    'total_amount',
    'payment_widget_uri',
    'transactions'
  ],
  additionalProperties: false 
};