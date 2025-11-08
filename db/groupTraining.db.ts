import { db } from "@utils/dbConnects";
import { DataTypes } from "sequelize";

const gttTableName = 'group_training_time_tables';
const gtuTableName = 'group_training_users';
const gtTableName = 'group_trainings';

export interface GroupTrainingTimeTableDB {
  id: number;
  group_training_id: number;
  club_id: number;
  start_time: Date;
  end_time: Date;
  is_payable: boolean;
  is_deleted: boolean;
  config_settings_id: number | null;
  queue_available: boolean;
  club_zone_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  parent_id: number | null;
  queue_limit: number;
  booking_start_at: Date;
  booking_end_at: Date;
  count_seats: number;
  club_start_time: Date;
  club_end_time: Date;
}

export const groupTrainingTimeTableDB = db.define(
    gttTableName,
    {
        id: { type: DataTypes.BIGINT, primaryKey: true },
        group_training_id: { type: DataTypes.BIGINT },
        club_id: { type: DataTypes.BIGINT },
        start_time: { type: DataTypes.DATE },
        end_time: { type: DataTypes.DATE },
        is_payable: { type: DataTypes.BOOLEAN },
        is_deleted: { type: DataTypes.BOOLEAN },
        config_settings_id: { type: DataTypes.BIGINT },
        queue_available: { type: DataTypes.BOOLEAN },
        club_zone_id: { type: DataTypes.BIGINT },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE },
        parent_id: { type: DataTypes.BIGINT },
        queue_limit: { type: DataTypes.INTEGER },
        booking_start_at: { type: DataTypes.DATE },
        booking_end_at: { type: DataTypes.DATE },
        count_seats: { type: DataTypes.INTEGER },
        club_start_time: { type: DataTypes.DATE },
        club_end_time: { type: DataTypes.DATE },
    },
    {
        timestamps: false
    }
);

export interface GroupTrainingUsersDB {
  id: number;
  group_training_time_table_id: number;
  user_id: number;
  booking_status: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export const groupTrainingUsersDB = db.define(
    gtuTableName,
    {
        id: { type: DataTypes.BIGINT, primaryKey: true },
        group_training_time_table_id: { type: DataTypes.BIGINT },
        user_id: { type: DataTypes.BIGINT },
        booking_status: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    },
    {
        timestamps: false
    }
);

export interface GroupTrainingDB {
  id: number;
  group_training_category_id: number;
  desc: string | null;
  name: string;
  is_deleted: Boolean;
  created_at: Date | null;
  updated_at: Date | null;
  intensity: number;
  content: Object | null;
  booking_start_threshold: number;
  booking_end_threshold: number;
  short_desc: string | null;
  total_duration: number | null;
}

export const groupTrainingDB = db.define(
    gtTableName,
    {
        id: { type: DataTypes.BIGINT, primaryKey: true },
        group_training_category_id: { type: DataTypes.BIGINT },
        desc: { type: DataTypes.STRING },
        name: { type: DataTypes.STRING },
        is_deleted: { type: DataTypes.BOOLEAN },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE },
        intensity: { type: DataTypes.INTEGER },
        content: { type: DataTypes.JSONB },
        booking_start_threshold: { type: DataTypes.SMALLINT},
        booking_end_threshold: { type: DataTypes.SMALLINT},
        short_desc: { type: DataTypes.STRING},
        total_duration: { type: DataTypes.INTEGER}
    },
    {
        timestamps: false
    }
);

export interface JoiningTableDB {
  training_name: string;
  training_id: number;
  user_id: number;
}




export async function selectFirstTrainingWithBookedUser(): Promise<JoiningTableDB | null> {
    const [results] = await db.query(`
      SELECT 
        gtu.group_training_time_table_id as training_id,
        gtu.user_id,
        gt.name as training_name
      FROM ${gtuTableName} gtu
      INNER JOIN ${gttTableName} gtt
        ON gtu.group_training_time_table_id = gtt.id
      INNER JOIN ${gtTableName} gt
        ON gtt.group_training_id = gt.id
      WHERE gtu.booking_status = 'booked'
        AND gtt.start_time > NOW()
        AND (gtt.is_deleted = false OR gtt.is_deleted IS NULL)
        AND (gt.is_deleted = false OR gt.is_deleted IS NULL)
      ORDER BY gtt.start_time ASC
      LIMIT 1
    `);
        const resultsArray = results as JoiningTableDB[];
        return resultsArray.length > 0 ? resultsArray[0] : null;   
    }