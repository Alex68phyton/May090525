import { db } from "@utils/dbConnects";
import { DataTypes } from "sequelize";

const tableName = 'user_notifications'
export interface UserNotificationsDB {
  id: number;
  user_id: number;
  sending_type: string;
  send_at: Date | null;
  notification_type: string;
  description: string;
  send_to: string;
  notify_template_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  body:JSON | null;
}

export const userNotificationsTableDB = db.define(
    tableName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    sending_type: {
      type: DataTypes.STRING
    },
    send_at: {
      type: DataTypes.DATE
    },
    notification_type: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    send_to: {
      type: DataTypes.STRING
    },
    notify_template_id: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    },
    body: {
      type: DataTypes.JSON
    }
  }, {
    timestamps: false
  });

  export async function selectUserNotification(sendTo: string): Promise <UserNotificationsDB> {
      const result = await db.query(
          `SELECT * FROM ${tableName} WHERE send_to = '${sendTo}' ORDER BY id DESC LIMIT 1`,
          { model: userNotificationsTableDB, mapToModel: true});
  
      return <UserNotificationsDB | any>result[0];   
  }