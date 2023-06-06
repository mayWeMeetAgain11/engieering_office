'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AbsenceDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AbsenceOrder, {
        foreignKey: {
          name: 'absence_order_id',
          allowNull: true
        },
        as: 'absence_order',
      });
    }
  }
  AbsenceDocument.init({
    absence_document_id: {
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
    modelName: 'AbsenceDocument',
    // tableName: 'absence_documents'
  });
  return AbsenceDocument;
};