import { Router } from 'express';
import UserController from './app/controllers/user-controller';
import LoginController from './app/controllers/login-controller';
import TaskController from './app/controllers/task-controller';
import loginRequired from './app/middleware/loginRequired';


const routes = new Router();


routes.post('/user/register', UserController.store);
routes.post('/user/confirm', UserController.confirmPhone);
routes.post('/user/login', LoginController.store);

routes.post('/task', loginRequired, TaskController.store);


export default routes;