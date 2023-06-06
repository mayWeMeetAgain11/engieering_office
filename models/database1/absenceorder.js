'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AbsenceOrder extends Model {
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
      this.hasMany(models.AbsenceDocument, {
        foreignKey: {
          name: 'absence_order_id',
          allowNull: true
        },
        as: 'absencedocuments'
      });
    }
  }
  AbsenceOrder.init({
    absence_order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time_a: {
      type: DataTypes.TIME,
      allowNull: false
    },
    time_b: {
      type: DataTypes.TIME,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'AbsenceOrder',
    // tableName: 'absence_orders'
  });
  return AbsenceOrder;
};