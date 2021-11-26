"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), dish_id: undefined, order_id: undefined };
    }
  }
  OrderDish.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      DishId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      excluded_ingredients: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      tableName: "OrderDish",
    }
  );
  return OrderDish;
};
