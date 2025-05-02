import { Router } from 'express';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const taskRoutes = Router();

taskRoutes.post('/', isAuthenticated, new CreateTaskController().handle);

export { taskRoutes };