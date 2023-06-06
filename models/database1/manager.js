'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Engineer, {
        foreignKey: {
          name: 'manager_id',
          allowNull: true
        },
        as: 'engineers'
      });
      this.hasMany(models.EngineerDocument, {
        foreignKey: {
          name: 'manager_id',
          allowNull: true
        },
        as: 'engineer_documents'
      });
      this.hasMany(models.Manager, {
        foreignKey: {
          name: 'manage_id',
          allowNull: true
        },
        as: 'managers'
      });
      this.belongsTo(models.Manager, {
        foreignKey: {
          name: 'manage_id',
          allowNull: true
        },
        as: 'manager'
      });
      // this.belongsTo(models.Office, {
      //   foreignKey: {
      //     name: 'office_id',
      //     allowNull: true
      //   },
      //   as: 'office'
      // });
    }
  }
  Manager.init({
    manager_id: {
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
    card_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    office_id: {
      type: DataTypes.INTEGER,
    },
    address: {
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
    salary: {
      type: DataTypes.DOUBLE,
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
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Manager',
    // tableName: 'managers',
    // schema: 'engineering_office'
  });
  return Manager;
};