"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const FormSupport = connection_1.default.define("form", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    open: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    locator: {
        type: sequelize_1.DataTypes.STRING,
    },
    reference: {
        type: sequelize_1.DataTypes.STRING,
    },
    amount: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    uri: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: "form_support",
});
exports.default = FormSupport;
//# sourceMappingURL=form-support-models.js.map