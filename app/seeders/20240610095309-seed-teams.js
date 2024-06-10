"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      "teams",
      [
        {
          name: "Sales",
          description: "",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marketing",
          description: "",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Property Management",
          description: "",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("teams", null, {});
  },
};
