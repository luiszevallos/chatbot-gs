import { Sequelize } from "sequelize";

const URL_DB = process.env.POSTGRES_CONNECT || "";

const sequelize = new Sequelize(URL_DB);

export default sequelize;
