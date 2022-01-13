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
      "hobbies",
      [
        {
          hobby_name: "Drawing",
        },
        {
          hobby_name: "Singing",
        },
        {
          hobby_name: "Dancing",
        },
        {
          hobby_name: "Painting",
        },
        {
          hobby_name: "Writing",
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
