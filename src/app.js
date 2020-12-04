import './bootstrap';
import express from 'express';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import routes from './routes';
import { resolve } from 'path';
import './database/database';


class App {
  constructor() {
    this.init();
    this.routes();
  };

  init() {
    this.server = express();
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(express.static(resolve(__dirname, 'uploads', 'avatars')));
    if(process.env.NODE_ENVIROMENT === 'development') {
      this.server.use(new RateLimit({
        store: new RateLimitRedis({
          client: redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
          })
        }),
        windowMs: 1000 * 60 * 15,
        max: 100
      }));
    };
  };

  routes() {
    this.server.use(routes);
  };
};


export default new App().server;
