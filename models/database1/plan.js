'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Plan, {
      //   foreignKey: {
      //     name: 'parent_plan_id',
      //     allowNull: true
      //   },
      //   onDelete: 'CASCADE',
      //   as: "plans"
      // });
      // this.belongsTo(models.Plan, {
      //   foreignKey: {
      //     name: 'parent_plan_id',
      //     allowNull: true
      //   },
      //   as: "plan"
      // });
      // this.hasMany(models.Stage, {
      //   foreignKey: {
      //     name: 'plan_id',
      //     allowNull: true
      //   },
      //   as: "stages"
      // });
    }
  }
  Plan.init({
  plan_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  p_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: '1'
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  }, {
    sequelize,
    modelName: 'Plan',
    // tableName: 'plans'
  });
  return Plan;
};