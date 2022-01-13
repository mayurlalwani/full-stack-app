("use strict");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/db");

const StudentHobby = db.define(
  "student_hobby",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hobby_id: {
      type: Sequelize.INTEGER,
      references: { model: "hobbies", key: "id" },
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: "students", key: "id" },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = StudentHobby;
