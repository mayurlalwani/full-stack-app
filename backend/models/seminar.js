"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class seminar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  seminar.init(
    {
      seminar_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      seminar_name: DataTypes.STRING,
      seminar_date: DataTypes.DATE,
      seminar_price: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "seminar",
    }
  );
  return seminar;
};
