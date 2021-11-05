"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsToMany(models.Dish, {
        through: "OrderDish",
        as: "dish",
        foreignKey: "order_id",
      });
    }
  }
  Order.init(
    {
      customer_id: DataTypes.STRING,
      delivery_method: DataTypes.TEXT,
      total_price: DataTypes.INTEGER,
      delivery_date: DataTypes.DATE,
      contact_name: DataTypes.STRING,
      contact_phone: DataTypes.STRING,
      payment_method: DataTypes.BOOLEAN,
      adress: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "Принят в работу",
      },
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "Order",
      modelName: "Order",
    }
  );
  return Order;
};
