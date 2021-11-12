"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DishIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return { ...this.get(), dish_id: undefined, ingredient_id: undefined}
    }
  }
  DishIngredient.init(
    {
      dish_id: DataTypes.INTEGER,
      ingredient_id: DataTypes.INTEGER,
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "DishIngredient",
      modelName: "DishIngredient",
    }
  );
  return DishIngredient;
};
