'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Project, {
        foreignKey: {
          name: 'project_id',
          allowNull: true
        },
        as: 'project'
      });
    }
  }
  Bill.init({
    bill_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    payment: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Bill',
    // tableName: 'bills'
  });
  return Bill;
};