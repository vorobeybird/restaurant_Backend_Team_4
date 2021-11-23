"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    static associate(models) {
      Table.hasMany(models.Reserve, {
        as: "reserve",
        foreignKey: "table_id",
      });
    }

    toJSON() {
      return { ...this.get(), reserve_id: undefined };
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
      is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
