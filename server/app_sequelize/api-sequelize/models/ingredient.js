"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsToMany(models.Dish, {
        through: "DishIngredient",
        as: "dish",
        foreignKey: "ingredient_id",
      });
    }
    toJSON(){
      return { ...this.get(), dish_id: undefined, ingredient_id: undefined}
    }
  }
  Ingredient.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      tableName: "Ingredient",
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
