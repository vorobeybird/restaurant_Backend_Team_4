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
      
      Dish.belongsToMany(models.Order,{
        through: "OrderDish",
        as: "order",
        foreignKey: "dish_id"
      })
    }
  }
  Dish.init(
    {
      title:{
        type: DataTypes.STRING,
        allowNull:false
      } ,
      price:
      {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      weight:      {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      calories:      {
        type: DataTypes.INTEGER,
        allowNull:false
      },
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