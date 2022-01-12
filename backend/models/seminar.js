("use strict");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/db");

const Seminars = db.define(
  "seminars",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seminar_name: {
      type: DataTypes.STRING,
    },
    seminar_date: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.NUMBER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Seminars;
