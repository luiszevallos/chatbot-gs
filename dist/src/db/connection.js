"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const URL_DB = process.env.POSTGRES_CONNECT || "";
const sequelize = new sequelize_1.Sequelize(URL_DB, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map