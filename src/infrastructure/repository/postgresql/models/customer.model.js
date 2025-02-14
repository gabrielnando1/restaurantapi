
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';


const CustomerModel = sequelize.define('customer', {
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
  email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
  },
  phone: {
      type: DataTypes.STRING(11),
      allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'customer',
});

export default CustomerModel;
/*

const CustomerModel = (sequelize) => {
  const CustomerModel = sequelize.define('customer', {
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
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false
    }
  }, {
  });
  CustomerModel.associate = function(models) {
    // Defina aqui os relacionamentos, se houver.
  };
  return CustomerModel;
}

export default CustomerModel; 

 */