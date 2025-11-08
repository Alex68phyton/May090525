import { db } from "@utils/dbConnects";
import { DataTypes } from "sequelize";

const tableName = 'transactions'

export interface TransactionDB {
  id: number;
  provider_id: number;
  type: string;
  gate_id: number;
  user_id: number | null;
  user_payment_plan_id: number | null;
  discount_id: number | null;
  join_fee: number | null;
  membership_fee: number | null;
  our_amount: number;
  partner_amount: number | null;
  deposit_amount: number | null;
  discount_amount: number | null;
  total_amount: number;
  currency: string;
  payment_service_id: number | null;
  supp_transaction_id: string | null;
  card_token_id: number | null;
  description: string | null;
  employee_id: number | null;
  status: string;
  response: any | null;
  http_response_code: number | null;
  payment_service_response_code: number | null;
  receipt_id: number | null;
  fiscal_method: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  is_deleted: boolean;
  payment_transaction_id: number | null;
  club_legal_info_id: number | null;
  discount_code_id: number | null;
  refund_balance: number;
  parent_id: number | null;
  paymentsrv_transaction_id: number | null;
  membership_fee_discount_amount: number | null;
  join_fee_discount_amount: number | null;
  membership_data: any | null;
}

export const transactionsTableDB = db.define(
    tableName,
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      provider_id: {
        type: DataTypes.BIGINT
      },
      type: {
        type: DataTypes.STRING
      },
      gate_id: {
        type: DataTypes.BIGINT
      },
      user_id: {
        type: DataTypes.BIGINT
      },
      user_payment_plan_id: {
        type: DataTypes.BIGINT
      },
      discount_id: {
        type: DataTypes.BIGINT
      },
      join_fee: {
        type: DataTypes.DECIMAL(14, 5)
      },
      membership_fee: {
        type: DataTypes.DECIMAL(14, 5)
      },
      our_amount: {
        type: DataTypes.DECIMAL(14, 5)
      },
      partner_amount: {
        type: DataTypes.DECIMAL(14, 5)
      },
      deposit_amount: {
        type: DataTypes.DECIMAL(14, 5)
      },
      discount_amount: {
        type: DataTypes.DECIMAL(14, 5)
      },
      total_amount: {
        type: DataTypes.DECIMAL(14, 5)
      },
      currency: {
        type: DataTypes.STRING(3)
      },
      payment_service_id: {
        type: DataTypes.BIGINT
      },
      supp_transaction_id: {
        type: DataTypes.STRING
      },
      card_token_id: {
        type: DataTypes.BIGINT
      },
      description: {
        type: DataTypes.STRING(255)
      },
      employee_id: {
        type: DataTypes.BIGINT
      },
      status: {
        type: DataTypes.STRING
      },
      response: {
        type: DataTypes.JSONB
      },
      http_response_code: {
        type: DataTypes.INTEGER
      },
      payment_service_response_code: {
        type: DataTypes.INTEGER
      },
      receipt_id: {
        type: DataTypes.BIGINT
      },
      fiscal_method: {
        type: DataTypes.STRING(255)
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      },
      is_deleted: {
        type: DataTypes.BOOLEAN
      },
      payment_transaction_id: {
        type: DataTypes.BIGINT
      },
      club_legal_info_id: {
        type: DataTypes.BIGINT
      },
      discount_code_id: {
        type: DataTypes.BIGINT
      },
      refund_balance: {
        type: DataTypes.DECIMAL(14, 5)
      },
      parent_id: {
        type: DataTypes.BIGINT
      },
      paymentsrv_transaction_id: {
        type: DataTypes.BIGINT
      },
      membership_fee_discount_amount: {
        type: DataTypes.DECIMAL(14, 5)
      },
      join_fee_discount_amount: {
        type: DataTypes.DECIMAL(14, 5)
      },
      membership_data: {
        type: DataTypes.JSONB
      }
    }
)

export async function selectTransactionsWithUser(): Promise<TransactionDB> {
    const result = await db.query(`
      SELECT * FROM ${tableName} t WHERE user_id IS NOT NULL LIMIT 1
    `,
    { model: transactionsTableDB, mapToModel: true});
    
        return <TransactionDB | any>result[0];

}