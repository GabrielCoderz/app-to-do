import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { AuthUserController } from '../controllers/user/AuthUserController';

const userRoutes = Router();

userRoutes.post('/', new CreateUserController().handle);
userRoutes.post('/session', new AuthUserController().handle);

export { userRoutes };