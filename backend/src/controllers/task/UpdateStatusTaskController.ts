// controllers/task/UpdateTaskStatusController.ts
import { Request, Response } from 'express';
import { UpdateTaskStatusService } from '../../services/task/UpdateStatusTaskService';

class UpdateTaskStatusController {
  async handle(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { completed } = req.body;
    const user_id = req.user_id;

    const updateTask = new UpdateTaskStatusService();
    const result = await updateTask.execute({ id, user_id, completed });

    return res.json(result);
  }
}

export { UpdateTaskStatusController };