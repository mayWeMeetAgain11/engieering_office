'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Engineer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Manager, {
        foreignKey: {
          name: 'manager_id',
          allowNull: true
        },
        as: "manager"
      });
      this.hasMany(models.WorkHour, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "workhours"
      });
      this.hasMany(models.ActualWorkHour, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "atualworkhours"
      });
      this.hasMany(models.AbsenceOrder, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "absenceorder"
      });
      this.hasMany(models.EngineerOrder, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "engineerorders"
      });
      this.hasMany(models.EngineerAccounting, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "engineeraccountings"
      });
      this.hasMany(models.EngineerDocument, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "engineerdocuments"
      });
      this.hasMany(models.StageDocument, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        as: "stagedocuments"
      });
      // this.hasMany(models.EvaluationEnginnerMaterial, {
      //   foreignKey: {
      //     name: 'engineer_id',
      //     allowNull: true
      //   },
      //   as: "evaluationenginnermaterials"
      // });
      this.belongsToMany(models.Stage, {
        foreignKey: {
          name: 'engineer_id',
          allowNull: true
        },
        through: models.StageEngineer,
        onDelete: 'SET NULL'
      });
    }
  }
  Engineer.init({
    engineer_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    card_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'phone number already in use!'
      }
    },
    salary: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deserve: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    sequelize,
    modelName: 'Engineer',
    // tableName: 'engineers',
    // schema: 'engineering_office'
  });
  return Engineer;
};