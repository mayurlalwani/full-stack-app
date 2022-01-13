"use strict";

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
      "student_hobby",
      [
        {
          hobby_id: 1,
          user_id: 6,
        },
        {
          hobby_id: 2,
          user_id: 6,
        },
        {
          hobby_id: 3,
          user_id: 6,
        },
        {
          hobby_id: 2,
          user_id: 1,
        },
        {
          hobby_id: 1,
          user_id: 1,
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
