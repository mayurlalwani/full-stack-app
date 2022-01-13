("use strict");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/db");

const Hobbies = db.define(
  "database_development.hobbies",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hobby_name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Hobbies;
