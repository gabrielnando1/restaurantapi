
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';


const OrderModel = sequelize.define('order', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: 'order',
});

OrderModel.associate = function(models) {
    OrderModel.belongsTo(models.CustomerModel, { foreignKey: 'customer_id', as: 'customer' });
};

export default OrderModel;