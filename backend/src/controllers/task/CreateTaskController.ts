import { Request, Response } from "express";
import { CreateTaskService } from "../../services/task/CreateTaskService";

class CreateTaskController {
    
    async handle(request: Request, response: Response): Promise<any> {
        try {
            const { description, priority, completed } = request.body;
            const user_id = request.user_id;
      
            const createTaskService = new CreateTaskService();
      
            const task = await createTaskService.execute({
              user_id,
              description,
              priority,
              completed,
            });
      
            return response.status(201).json(task);
          } catch (err: any) {
            return response.status(400).json({ error: err.message });
          }
    } 

}

export { CreateTaskController }