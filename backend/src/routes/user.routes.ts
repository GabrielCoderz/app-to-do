import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { AuthUserController } from '../controllers/user/AuthUserController';

const userRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */
userRoutes.post('/', new CreateUserController().handle);
userRoutes.post('/session', new AuthUserController().handle);

export { userRoutes };