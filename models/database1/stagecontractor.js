'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageContractor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ContractorDocument, {
        foreignKey: {
          name: 'stage_contractor_id',
          allowNull: true
        },
        as: "contractordocuments"
      });
    }
  }
  StageContractor.init({
    stage_contractor_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    stage_id: DataTypes.INTEGER,
    contractor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StageContractor',
    // tableName: 'stage_contractors',
    // schema: 'engineering_office'
  });
  return StageContractor;
};