'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageEngineer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StageEngineer.init({
    stage_engineer_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    stage_id: DataTypes.INTEGER,
    engineer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StageEngineer',
    // tableName: 'stage_engineers',
  });
  return StageEngineer;
};