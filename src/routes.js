import { Router } from 'express';
import UserController from './app/controllers/user-controller';
import LoginController from './app/controllers/login-controller';


const routes = new Router();


routes.post('/user/register', UserController.store);
routes.post('/user/confirm', UserController.confirmPhone);
routes.post('/user/login', LoginController.store);


export default routes;