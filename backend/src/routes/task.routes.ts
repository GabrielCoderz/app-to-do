import { Router } from 'express';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { ListTaskController } from '../controllers/task/ListTaskController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const taskRoutes = Router();

taskRoutes.post('/', isAuthenticated, new CreateTaskController().handle);
taskRoutes.get('/', isAuthenticated, new ListTaskController().handle);

export { taskRoutes };