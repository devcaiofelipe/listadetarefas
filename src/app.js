import express from 'express';
import routes from './routes';
import { resolve } from 'path';
import './database/database';
require('dotenv').config();


class App {
  constructor() {
    this.init();
    this.routes();
  };

  init() {
    this.server = express();
    this.server.listen(3000);
    this.server.use(express.json());
    this.server.use(express.static(resolve(__dirname, 'uploads', 'avatars')));
  };

  routes() {
    this.server.use(routes);
  };
};


const app = new App();
