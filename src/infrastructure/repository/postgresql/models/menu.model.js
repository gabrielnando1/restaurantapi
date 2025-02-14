
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';


const MenuModel = sequelize.define('menu', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING(150),
      allowNull: false
  },
  description: {
      type: DataTypes.STRING(150),
      allowNull: false,
  },
  price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
  },
  category: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'menu',
});

export default MenuModel;