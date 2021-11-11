"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserve extends Model {
    toJSON(){
      return { ...this.get() }
    }
  }
  Reserve.init(
    {
        table_id: DataTypes.INTEGER,
        reserve_date: DataTypes.DATEONLY,
        reserve_time: DataTypes.TIME
    },
    {
      sequelize,
      timestamps: false,
      tableName: "TableOrder",
      modelName: "TableOrder",
    }
  );
  return Reserve;
};