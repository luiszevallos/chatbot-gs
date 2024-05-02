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
    locator: {
      type: DataTypes.STRING,
    },
    reference: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    phoneNumber: {
      type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "forms",
  }
);

export default FormSupport;
