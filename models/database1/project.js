'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Bill, {
        foreignKey: {
          name: 'project_id',
          allowNull: true
        },
        as: "bills"
      });
      this.hasMany(models.ProjectDocument, {
        foreignKey: {
          name: 'project_id',
          allowNull: true
        },
        as: "projectdocuments"
      });
      this.hasMany(models.Stage, {
        foreignKey: {
          name: 'project_id',
          allowNull: true
        },
        as: "stages"
      });
      // this.belongsToMany(models.Owner, {
      //   foreignKey: {
      //     name: 'project_id',
      //     allowNull: true
      //   },
      //   through: models.ProjectOwner,
      //   onDelete: 'SET NULL'
      // });
    }
  }
  Project.init({
    project_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    primary_cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Project',
    // freezeTableName: true
    // tableName: 'projects',
    // schema: 'engineering_office'
  });
  return Project;
};