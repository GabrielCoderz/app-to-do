import { Request, Response } from "express";
import { ListTaskService } from "../../services/task/ListTaskService";

class ListTaskController {
    
    async handle(request: Request, response: Response): Promise<any> {
        try {
            const user_id = request.user_id;

            const listTaskService = new ListTaskService();
    
            const task = await listTaskService.execute({
                user_id,
            });
    
            return response.status(201).json(task);
        } catch(err: any) {
            return response.status(400).json({ error: err.message });
        }
    } 

}

export { ListTaskController }