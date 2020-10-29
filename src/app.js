import express from 'express';
import routes from './routes';


class App {
  constructor() {
    this.init();
    this.routes();
  };

  init() {
    this.server = express();
    this.server.listen(3000);
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  };

};


const app = new App();
