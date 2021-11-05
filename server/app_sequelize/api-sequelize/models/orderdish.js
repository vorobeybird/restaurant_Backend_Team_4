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
    toJSON(){
      return { ...this.get(), dish_id: undefined, order_id: undefined}
    }
  }
  OrderDish.init(
    {
      dish_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
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
