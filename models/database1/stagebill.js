'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Stage, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        as: "stage"
      });
      this.belongsTo(models.StageDocument, {
        foreignKey: {
          name: 'stage_document_id',
          allowNull: true
        },
        as: "stagedocument"
      });
    }
  }
  StageBill.init({
    stage_bill_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StageBill',
    // tableName: 'stage_bills'
  });
  return StageBill;
};