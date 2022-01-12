"use strict";
let tableModel = { schema: "database_development", tableName: "hobbies" };
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      tableModel,
      [
        {
          hobbies: "Drawing",
          user_id: 1,
        },
        {
          hobbies: "Singing",
          user_id: 1,
        },
        {
          hobbies: "Dancing",
          user_id: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
