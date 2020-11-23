import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/user-controller';
import LoginController from './app/controllers/login-controller';
import TaskController from './app/controllers/task-controller';
import PasswordController from './app/controllers/password-controller';
import AvatarController from './app/controllers/avatar-controller';
import loginRequired from './app/middleware/loginRequired';


const routes = new Router();

const upload = multer(multerConfig);


routes.post('/user/register', UserController.store);
routes.post('/user/active', UserController.activeUser);
routes.post('/user/login', LoginController.store);
routes.put('/user/delete', loginRequired, UserController.delete);
routes.put('/user/update', loginRequired, UserController.update);
routes.put('/user/update/password', loginRequired, PasswordController.update);
routes.post('/user/avatar', loginRequired, upload.single('avatar'), AvatarController.store);

routes.post('/task/create', loginRequired, TaskController.store);
routes.get('/task/all', loginRequired, TaskController.index);
routes.put('/task/update', loginRequired, TaskController.update);


export default routes;