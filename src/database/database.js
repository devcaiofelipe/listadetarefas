import Sequelize from 'sequelize';
import databaseConfig from './config/database';


export default class Database {
  constructor() {
    this.initPostgres();
  };

  initPostgres() {
    this.connection = new Sequelize(databaseConfig);
  };
};