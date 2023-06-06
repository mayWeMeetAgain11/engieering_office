'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EngineerAccounting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Engineer, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "engineeraccouting"
      });
      this.belongsTo(models.EngineerOrder, {
        foreignKey: {
          name: 'engineer_order_id',
          allowNull: true
        },
        as: "engineerorder"
      });
    }
  }
  EngineerAccounting.init({
    engineer_accounting_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EngineerAccounting',
    // tableName: 'engineer_accountings'
  });
  return EngineerAccounting;
};