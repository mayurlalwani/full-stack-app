"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("student_hobby", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      hobby_id: {
        type: Sequelize.INTEGER,
        references: { model: "hobbies", key: "id" },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "students", key: "id" },
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
