'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EngineerDocument extends Model {
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
        as: "engineer"
      });
      this.belongsTo(models.Manager, {
        foreignKey: {
          name: 'manager_id',
          allowNull: true
        },
        as: "manager"
      });
    }
  }
  EngineerDocument.init({
    engineer_document_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EngineerDocument',
    // tableName: 'engineer_documents'
  });
  return EngineerDocument;
};