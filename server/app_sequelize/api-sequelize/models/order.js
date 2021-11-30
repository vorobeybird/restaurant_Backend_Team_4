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
        through: { model: models.OrderDish, unique: false },
        foreignKey: "order_id",
      });
      Order.hasMany(models.OrderDish, { foreignKey: "order_id" });

      Order.belongsTo(models.Reserve, {
        as: "reserve",
        foreignKey: "reserve_id",
      });
    }
    toJSON() {
      return {
        ...this.get(),
        dish_id: undefined,
        order_id: undefined,
        table_id: undefined,
      };
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
      payment_method: DataTypes.INTEGER,
      adress: DataTypes.STRING,
      contact_phone: DataTypes.STRING,

      status: {
        type: DataTypes.STRING,
        defaultValue: "Принят в работу",
      },
      comment: DataTypes.STRING,
      reserve_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "Order",
      modelName: "Order",
    }
  );
  return Order;
};
