"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    static associate(models) {
      Table.hasMany(models.Order, {
        through: "TableOrder",
        as: "order",
        foreignKey: "table_id",
      });
    }

    toJSON(){
      return { ...this.get(), table_id: undefined }
    }
  }
  Table.init(
    {
      table_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      persons: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reserved_day_start: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      reserved_day_middle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      reserved_day_end: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "Table",
      modelName: "Table",
    }
  );
  return Table;
};