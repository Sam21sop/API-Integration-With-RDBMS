import sequelize from 'sequelize';
import Database from '../config/database.js';

const {DataTypes} = sequelize;

const transactionModel = Database.define('Transaction', {
  id:{
    type: DataTypes.NUMBER,
    primaryKey: true,
    allowNull:false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isSold: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  dateOfSale: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  imageUrl:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

export default transactionModel;
