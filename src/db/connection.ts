import { Sequelize } from "sequelize";

const URL_DB = process.env.POSTGRES_CONNECT || "";

const sequelize = new Sequelize(URL_DB, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
