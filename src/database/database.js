import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/user-model';
import Task from '../app/models/task-model';

const models = [User, Task];



export default new class Database {
  constructor() {
    this.initPostgres();
    this.initModels();
  };

  initPostgres() {
    this.connection = new Sequelize(databaseConfig);
  };

  initModels() {
    models.forEach(models => models.init(this.connection));
    models.forEach(model => model.associate && model.associate(this.connection.models));
  };
};