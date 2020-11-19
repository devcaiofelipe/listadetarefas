import { Router } from 'express';
import UserController from './app/controllers/user-controller';
import LoginController from './app/controllers/login-controller';
import TaskController from './app/controllers/task-controller';
import PhoneController from './app/controllers/phone-controller';
import PasswordController from './app/controllers/password-controller';
import loginRequired from './app/middleware/loginRequired';


const routes = new Router();


routes.post('/user/register', UserController.store);
routes.post('/user/active', UserController.activeUser);
routes.post('/user/login', LoginController.store);
routes.put('/user/delete', loginRequired, UserController.delete);
routes.put('/user/update', loginRequired, UserController.update);
routes.put('/user/update/password', loginRequired, PasswordController.update);

routes.post('/task/create', loginRequired, TaskController.store);
routes.get('/task', loginRequired, TaskController.index);


export default routes;