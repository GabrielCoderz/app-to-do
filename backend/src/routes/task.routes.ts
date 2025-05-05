import { Router } from 'express';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { ListTaskController } from '../controllers/task/ListTaskController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

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

export { taskRoutes };