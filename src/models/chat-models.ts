import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const Chat = sequelize.define(
  "chat",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatbot: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "chats",
  }
);

export default Chat;
