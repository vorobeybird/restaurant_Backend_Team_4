'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      delivery_method: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      total_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      delivery_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      contact_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contact_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      adress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Order');
  }
};