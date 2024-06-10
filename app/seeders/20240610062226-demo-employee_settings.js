"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('employee_settings', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "employee_settings",
      [
        {
          emp_id: 1,
          theam: "Dark",
          auto_login: false,
        },
        {
          emp_id: 2,
          theam: "Light",
          auto_login: false,
        },
        {
          emp_id: 3,
          theam: "Dark",
          auto_login: true,
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
     * await queryInterface.bulkDelete('employee_settings', null, {});
     */

    await queryInterface.bulkDelete("employee_settings", null, {});
  },
};
