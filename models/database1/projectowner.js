'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProjectOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
    }
    ProjectOwner.init({
        project_owner_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        owner_id: DataTypes.INTEGER,
        project_id: DataTypes.INTEGER
    }, {
    sequelize,
        modelName: 'ProjectOwner',
        // tableName: 'project_owners',
        // schema: 'engineering_office'
    });
    return ProjectOwner;
};