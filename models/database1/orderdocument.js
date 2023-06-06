'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.EngineerOrder, {
        foreignKey: {
          name: 'engineer_order_id',
          allowNull: true
        },
        as: 'engineerorder'
      });
    }
  }
  OrderDocument.init({
    order_document_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderDocument',
    // tableName: "order_documents"
  });
  return OrderDocument;
};