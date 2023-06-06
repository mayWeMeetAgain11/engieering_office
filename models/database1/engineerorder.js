'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EngineerOrder extends Model {
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
        as: 'engineer'
      });
      this.hasMany(models.OrderDocument, {
        foreignKey: {
          name: 'engineer_order_id',
          allowNull: true,
          defaultValue: 0,
        },
        as: 'orderdocuments'
      });
      this.hasMany(models.EngineerAccounting, {
        foreignKey: {
          name: 'engineer_order_id',
          allowNull: true
        },
        as: 'engineeraccountings'
      });
    }
  }
  EngineerOrder.init({
    engineer_order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    interval: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    fee: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'EngineerOrder',
    // tableName: 'engineer_orders'
  });
  return EngineerOrder;
};