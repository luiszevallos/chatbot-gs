"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Chat = connection_1.default.define("chat", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    chatbot: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
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
}, {
    tableName: "chats",
});
exports.default = Chat;
//# sourceMappingURL=chat-models.js.map