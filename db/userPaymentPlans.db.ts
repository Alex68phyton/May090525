import { db } from "@utils/dbConnects";
import { DataTypes } from "sequelize";

const tableName = 'user_payment_plans';

export interface UserPaymentPlansDB {
  id: number;
  user_id: number;
  payment_plan_id: number;
  club_id: number;
  signed_date: Date | null;
  start_date: Date | null;
  end_date: Date | null;
  pay_date: Date | null;
  cancel_date: Date | null;
  status: string | null;
  previous_status: string | null;
  card_token_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  cancel_reason: string | null;
  discount_id: number | null;
  discount_code_id: number | null;
  last_pay_try: Date | null;
  parent_id: number | null;
  pay_day: number | null;
  membership_data: Record<string, any> | null;
}

export const userPaymentPlansDB = db.define(
    tableName,
    {
        id: { type: DataTypes.BIGINT, primaryKey: true },
        user_id: { type: DataTypes.BIGINT },
        payment_plan_id: {type: DataTypes.BIGINT },
        club_id: { type: DataTypes.BIGINT },
        signed_date: { type: DataTypes.DATE },
        start_date: { type: DataTypes.DATE },
        end_date: { type: DataTypes.DATE },
        pay_date: { type: DataTypes.DATE },
        cancel_date: { type: DataTypes.DATE },
        status: { type: DataTypes.STRING },
        previous_status: { type: DataTypes.STRING },
        card_token_id: { type: DataTypes.BIGINT },
        created_at: { type: DataTypes.TIME},
        updated_at: { type: DataTypes.TIME },
        cancel_reason: { type: DataTypes.STRING },
        discount_id: { type: DataTypes.BIGINT },
        discount_code_id: { type: DataTypes.BIGINT },
        last_pay_try: { type: DataTypes.DATE },
        parent_id: { type: DataTypes.BIGINT },
        pay_day: { type: DataTypes.SMALLINT },
        membership_data: { type: DataTypes.JSONB },
    },
    {
        timestamps: false
    }
);

export async function selectUserPaymentPlanByStatus(status:string): Promise <UserPaymentPlansDB> {
    const result = await db.query(
        `SELECT upp1.* FROM ${tableName} upp1 WHERE upp1.status  = '${status}' 
            AND NOT EXISTS (
                SELECT 1 
                FROM user_payment_plans upp2 
                WHERE upp2.user_id = upp1.user_id 
                    AND upp2.id != upp1.id
        ) ORDER BY upp1.id DESC 
		LIMIT 1;`,
        { model: userPaymentPlansDB, mapToModel: true});

    return <UserPaymentPlansDB | any>result[0];   
}

export async function selectUserPaymentPlanById(userPaymentPlanId:number): Promise <UserPaymentPlansDB> {
    const result = await db.query(
        `SELECT * FROM ${tableName} WHERE id  = '${userPaymentPlanId}'`,
        { model: userPaymentPlansDB, mapToModel: true});

    return <UserPaymentPlansDB | any>result[0];   
}