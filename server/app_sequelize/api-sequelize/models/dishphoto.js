"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DishPhoto extends Model {
    static associate(models) {
      DishPhoto.belongsTo(models.Dish, {
        foreignKey: "dish_id",
        as: "dish",
      });
    }
  }
  DishPhoto.init(
    {
      dish_id: DataTypes.INTEGER,
      photo_url: DataTypes.STRING,
      ordinal_num: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      public_id: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      tableName: "dishphoto",
      modelName: "DishPhoto",
    }
  );
  return DishPhoto;
};
