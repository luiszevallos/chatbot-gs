import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const FormSupport = sequelize.define(
  "form",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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
    locator: {
      type: DataTypes.STRING,
    },
    reference: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    uri: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "form_support",
  }
);

export default FormSupport;
