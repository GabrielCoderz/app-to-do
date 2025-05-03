import prisma from '../../prisma';

enum Priority {
    ALTA = 'ALTA',
    MEDIA = 'MEDIA',
    BAIXA = 'BAIXA',
}

interface ListTaskRequest {
    user_id: string;
}

class ListTaskService {

    async execute({ user_id }: ListTaskRequest) {

        const task = await prisma.todo.findMany({
            where: {
                userId: user_id
            }
        })
        
        return task;
    }

}

export { ListTaskService }