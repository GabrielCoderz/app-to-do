import prisma from '../../prisma';

enum Priority {
    ALTA = 'ALTA',
    MEDIA = 'MEDIA',
    BAIXA = 'BAIXA',
}

interface CreateTaskRequest {
    user_id: string;
    description: string;
    priority: Priority;
    completed: boolean;
}

class CreateTaskService {

    async execute({ user_id, description, priority, completed }: CreateTaskRequest) {

        if(!description) {
            throw new Error("A descrição da tarefa é obrigatória.");
        }

        if(!completed) {
            throw new Error("O status da tarefa é obrigatório.");
        }

        if (!Object.values(Priority).includes(priority)) {
            throw new Error('Prioridade inválida. Use Alta, Média ou Baixa.');
        }

        const task = await prisma.todo.create({
            data: {
                description,
                priority,
                completed,
                userId: user_id
            }
        })
        
        return task;
    }

}

export { CreateTaskService }