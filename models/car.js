"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "createdBy",
          allowNull: false,
        },
      });
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "lastUpdatedBy",
        },
      });
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "deletedBy",
        },
      });
    }
  }
  Car.init(
    {
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      image: DataTypes.STRING,
      rentPerDay: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      availableAt: DataTypes.DATE,
      transmission: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      year: DataTypes.INTEGER,
      options: DataTypes.TEXT,
      specs: DataTypes.TEXT,
      createdBy: DataTypes.STRING,
      deletedBy: DataTypes.STRING,
      lastUpdatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
