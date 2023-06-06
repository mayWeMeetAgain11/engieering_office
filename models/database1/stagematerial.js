'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ContractorBill, {
        foreignKey: {
          name: 'stage_material_id',
          allowNull: true
        },
        as: "contractor_bills"
      });
      this.belongsTo(models.Stage, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        as: "stage"
      });
    }
  }
  StageMaterial.init({
    stage_material_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    stage_id: DataTypes.INTEGER,
    material_id: DataTypes.INTEGER,
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    quatity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StageMaterial',
    // tableName: 'stage_materials',
    // schema: 'engineering_office'
  });
  return StageMaterial;
};