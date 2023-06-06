'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.StageDocument, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        as: "stagedocuments"
      });
      // this.hasMany(models.StageBill, {
      //   foreignKey: {
      //     name: 'stage_id',
      //     allowNull: true
      //   },
      //   as: "stagebills"
      // });
      this.hasMany(models.StageMaterial, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        as: "stagematerials"
      });
      // this.belongsTo(models.Stage, {
      //   foreignKey: {
      //     name: 'parent_stage_id',
      //     allowNull: true
      //   },
      //   as: "stage"
      // });
      this.belongsToMany(models.Engineer, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        through: models.StageEngineer,
        onDelete: 'SET NULL',
        as: 'engineers'
      });
      this.hasMany(models.StageBill, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        as: "stagebills"
      });
      // this.belongsTo(models.Plan, {
      //   foreignKey: {
      //     name: 'plan_id',
      //     allowNull: true
      //   },
      //   as: "plan"
      // });
      this.belongsTo(models.Project, {
        foreignKey: {
          name: 'project_id',
          allowNull: true
        },
        as: "project"
      });
      this.hasMany(models.Latency, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        as: "latencys"
      });
      this.hasMany(models.StageFile, {
        foreignKey: {
          name: 'stage_id',
          allowNull: true
        },
        as: "stagefiles"
      });
      // this.belongsToMany(models.Contractor, {
      //   foreignKey: {
      //     name: 'stage_id',
      //     allowNull: true
      //   },
      //   through: models.StageContractor,
      //   onDelete: 'SET NULL'
      // });
      // this.belongsToMany(models.Material, {
      //   foreignKey: {
      //     name: 'stage_id',
      //     allowNull: true
      //   },
      //   through: models.StageMaterial,
      //   onDelete: 'SET NULL'
      // });
    }
  }
  Stage.init({
    stage_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    project_id: {
      type: DataTypes.INTEGER
  },
    starting_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    ending_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    evaluation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    ended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Stage',
    // tableName: 'stages',
    // schema: 'engineering_office'
  });
  return Stage;
};