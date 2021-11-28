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
      OrderDish.belongsTo(models.Dish, { foreignKey: "dish_id" });
      OrderDish.belongsTo(models.Order, { foreignKey: "order_id" });
    }
    toJSON() {
      console.log(this.get());
      return { ...this.get(), id: undefined, order_id: undefined };
    }
  }
  OrderDish.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dish_id: {
        type: DataTypes.INTEGER,
        unique: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        unique: false,
      },
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
      modelName: "OrderDish",
    }
  );
  return OrderDish;
};
