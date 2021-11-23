"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Reserve",
      "reserve_time",
      "reserve_start_time"
    );
    await queryInterface.addColumn("Reserve", "reserve_end_time", {
      type: Sequelize.TIME,
    });
    await queryInterface.sequelize.query(
      "UPDATE Reserve SET reserve_end_time = DATE_ADD(reserve_start_time, interval 4 hour)"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Reserve",
      "reserve_start_time",
      "reserve_time"
    );
    await queryInterface.removeColumn("Reserve", "reserve_end_time");
  },
};
