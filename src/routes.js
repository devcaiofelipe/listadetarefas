import { Router } from 'express';
import UserController from './app/controllers/user-controller';
import LoginController from './app/controllers/login-controller';
import TaskController from './app/controllers/task-controller';
import PhoneController from './app/controllers/phone-controller';
import loginRequired from './app/middleware/loginRequired';


const routes = new Router();


routes.post('/user/register', UserController.store);
routes.post('/user/confirm', UserController.confirmUserPhone);
routes.post('/user/login', LoginController.store);
routes.put('/user/update', loginRequired, UserController.update);
routes.put('/user/delete', loginRequired, UserController.delete);
routes.put('/user/update/phone', loginRequired, UserController.update);
routes.put('/user/update/password', loginRequired, UserController.update);

routes.post('/task/create', loginRequired, TaskController.store);
routes.get('/task', loginRequired, TaskController.index);

routes.post('/phone/update', loginRequired, PhoneController.update);

export default routes;