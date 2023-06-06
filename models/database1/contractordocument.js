'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractorDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.StageContractor, {
        foreignKey: {
          name: 'stage_contractor_id',
          allowNull: true
        },
        as: "stagecontractor"
      });
    }
  }
  ContractorDocument.init({
    Contractor_document_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ContractorDocument',
    // tableName: 'contractor_documents'
  });
  return ContractorDocument;
};