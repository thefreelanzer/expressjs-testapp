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
      "employees",
      [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          position: "Software Engineer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          position: "Project Manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Emily Johnson",
          email: "emily.johnson@example.com",
          position: "Designer",
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
    await queryInterface.bulkDelete("employees", null, {});
  },
};
