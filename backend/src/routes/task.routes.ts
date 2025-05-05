import { Router } from 'express';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { ListTaskController } from '../controllers/task/ListTaskController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { UpdateTaskStatusController } from '../controllers/task/UpdateStatusTaskController';

const taskRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Operações relacionadas às tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [ALTA, MEDIA, BAIXA]
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 priority:
 *                   type: string
 *                   enum: [ALTA, MEDIA, BAIXA]
 *                 completed:
 *                   type: boolean
 */
taskRoutes.post('/', isAuthenticated, new CreateTaskController().handle);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista as tarefas
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: Tarefas buscadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 priority:
 *                   type: string
 *                   enum: [ALTA, MEDIA, BAIXA]
 *                 completed:
 *                   type: boolean
 */
taskRoutes.get('/', isAuthenticated, new ListTaskController().handle);

/**
 * @swagger
 * /tasks/:id/completed:
 *   get:
 *     summary: Atualiza o status da tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tarefas buscadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 completed:
 *                   type: boolean
 */
taskRoutes.patch('/:id/completed', isAuthenticated, new UpdateTaskStatusController().handle);

export { taskRoutes };