"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Table", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      table_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      persons: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.createTable("Reserve", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      table_id: Sequelize.INTEGER,
      reserve_date: Sequelize.DATEONLY,
      reserve_time: Sequelize.TIME,
    });
    await queryInterface.addColumn("Order", "reserve_id", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Table");
    await queryInterface.dropTable("Reserve");
    await queryInterface.removeColumn("Order", "reserve_id");
  },
};
