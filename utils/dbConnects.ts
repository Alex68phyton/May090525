import { Sequelize } from "sequelize";
import dbConfig from "../db.json"

export const db = new Sequelize(
    dbConfig.name,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: "postgres"
    }
)