'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectDocument extends Model {
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
        as: "project"
      });
    }
  }
  ProjectDocument.init({
    project_document_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProjectDocument',
    // tableName: 'project_documents'
  });
  return ProjectDocument;
};