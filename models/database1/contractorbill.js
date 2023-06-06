'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ContractorBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.StageMaterial, {
            foreignKey: {
                name: 'stage_material_id',
                allowNull: true
            },
            as: "stage_material"
        });
    }
    }   
    ContractorBill.init({
        Contractor_bill_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
    sequelize,
    modelName: 'ContractorBill',
    // tableName: 'contractor_documents'
    });
    return ContractorBill;
};