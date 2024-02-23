import { Sequelize } from 'sequelize';

const Database = new Sequelize({
  dialect: 'sqlite', // You can change this to the desired database dialect
  storage: 'db.sqlite', // You can change this to the desired database file
});

export default Database;

