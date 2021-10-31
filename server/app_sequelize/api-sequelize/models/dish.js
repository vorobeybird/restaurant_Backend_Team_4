"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    static associate(models) {
      Dish.hasMany(models.DishPhoto, {
        foreignKey: "dish_id",
        as: "photo",
      });
      Dish.belongsToMany(models.Ingredient, {
        through: "DishIngredient",
        as: "ingredient",
        foreignKey: "dish_id",
      });
      Dish.belongsToMany(models.Category, {
        through: "DishCategory",
        as: "category",
        foreignKey: "dish_id",
      });
    }
  }
  Dish.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      calories: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      tableName: "dish",
      modelName: "Dish",
    }
  );
  return Dish;
};
