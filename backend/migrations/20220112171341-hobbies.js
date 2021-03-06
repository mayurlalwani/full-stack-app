"use strict";
let tableModel = { schema: "database_development", tableName: "hobbies" };
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("hobbies", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      hobby_name: {
        type: Sequelize.STRING,
      },
    });
    await transaction.commit();
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
