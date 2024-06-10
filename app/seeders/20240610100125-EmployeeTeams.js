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
      "employee_teams",
      [
        {
          emp_id: "1",
          team_id: "1",
        },
        {
          emp_id: "1",
          team_id: "2",
        },
        {
          emp_id: "1",
          team_id: "3",
        },
        {
          emp_id: "2",
          team_id: "2",
        },
        {
          emp_id: "2",
          team_id: "3",
        },
        {
          emp_id: "3",
          team_id: "3",
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
    await queryInterface.bulkDelete("employee_teams", null, {});
  },
};
