'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageDocument extends Model {
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
      this.hasMany(models.StageBill, {
        foreignKey: {
          name: 'stage_document_id',
          allowNull: true
        },
        as: "stagebill"
      });
      this.belongsTo(models.Engineer, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "engineer"
      });
      // this.belongsTo(models.StageEngineer, {
      //   foreignKey: {
      //     name: 'stage_engineer_id',
      //     allowNull: true
      //   },
      //   as: "stageengineer"
      // });
    }
  }
  StageDocument.init({
    stage_document_id: {
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
    modelName: 'StageDocument',
    // tableName: 'stage_documents'
  });
  return StageDocument;
};