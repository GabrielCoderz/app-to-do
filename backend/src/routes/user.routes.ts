import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';

const userRoutes = Router();

userRoutes.post('/', new CreateUserController().handle);

export { userRoutes };