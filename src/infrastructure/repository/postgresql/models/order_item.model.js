
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';


const OrderItemModel = sequelize.define('order_item', {
  order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
},
}, {
  timestamps: true,
  tableName: 'order_item',
});

OrderItemModel.associate = function(models) {
    OrderItemModel.belongsTo(models.OrderModel, { foreignKey: 'order_id', as: 'order' });
    OrderItemModel.belongsTo(models.MenuModel, { foreignKey: 'menu_id', as: 'menu' });
};

export default OrderItemModel;