"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Dish, {
        through: "DishCategory",
        as: "dish",
        foreignKey: "category_id",
      });
    }
    toJSON(){
      return { ...this.get(), DishCategory: undefined}
    }
  }
  Category.init(
    {
      title: DataTypes.STRING,
      show_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "category",
      modelName: "Category",
    }
  );
  return Category;
};
