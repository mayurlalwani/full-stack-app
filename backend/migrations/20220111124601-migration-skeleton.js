"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "students",
          "last_name",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "students",
          "email",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "students",
          "password",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
