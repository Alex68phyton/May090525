import { db } from "@utils/dbConnects";
import { table } from "console";
import { DataTypes } from "sequelize";

const tableName = 'card_tokens'
export interface CardTokensDB {
  id: number;
  user_id: number;
  payment_service_id: number;
  token: string;
  public_card_number: string | null;
  is_deleted: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export const cardTokensTableDB = db.define('CardToken', {
    tableName,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    payment_service_id: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.STRING
    },
    public_card_number: {
      type: DataTypes.STRING(16)
    },
    is_deleted: {
      type: DataTypes.BOOLEAN
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false
  });

  export async function selectCardToken(): Promise <CardTokensDB> {
      const result = await db.query(
          `SELECT * FROM ${tableName} WHERE public_card_number is not null ORDER BY id DESC LIMIT 1`,
          { model: cardTokensTableDB, mapToModel: true});
  
      return <CardTokensDB | any>result[0];   
  }