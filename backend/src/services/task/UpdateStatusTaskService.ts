// services/task/UpdateTaskStatusService.ts
import prisma from '../../prisma';

interface UpdateTaskStatusRequest {
  id: string;
  user_id: string;
  completed: boolean;
}

class UpdateTaskStatusService {
  async execute({ id, user_id, completed }: UpdateTaskStatusRequest) {
    const task = await prisma.todo.findFirst({
      where: {
        id,
        userId: user_id
      }
    });

    if (!task) {
      throw new Error('Tarefa não encontrada ou não pertence ao usuário');
    }

    const updatedTask = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    return updatedTask;
  }
}

export { UpdateTaskStatusService };