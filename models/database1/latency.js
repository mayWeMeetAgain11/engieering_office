'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Latency extends Model {
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
      this.hasMany(models.LatencyDocument, {
        foreignKey: {
          name: 'latency_id',
          allowNull: true
        },
        as: "latencydocuments"
      });
    }
  }
  Latency.init({
    latency_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    days_expected: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Latency',
    // tableName: 'Latencies'
  });
  return Latency;
};