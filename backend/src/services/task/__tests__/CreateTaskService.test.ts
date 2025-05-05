// src/services/task/__tests__/CreateTaskService.spec.ts

import { CreateTaskService } from '../CreateTaskService';
import { Priority } from '../CreateTaskService';
import prisma from '../../../prisma';

jest.mock('../../../prisma', () => ({
  todo: {
    create: jest.fn(),
  },
}));

describe('CreateTaskService', () => {
  const service = new CreateTaskService();

  const mockTask = {
    id: '123',
    description: 'Estudar Jest',
    priority: 'ALTA',
    completed: true,
    userId: 'user123',
  };

  it('deve criar uma task válida com sucesso', async () => {
    (prisma.todo.create as jest.Mock).mockResolvedValue(mockTask);

    const result = await service.execute({
      user_id: 'user123',
      description: 'Estudar Jest',
      priority: Priority.ALTA,
      completed: true,
    });

    expect(result).toEqual(mockTask);
    expect(prisma.todo.create).toHaveBeenCalledWith({
      data: {
        description: 'Estudar Jest',
        priority: Priority.ALTA,
        completed: true,
        userId: 'user123',
      },
    });
  });

  it('deve lançar erro se descrição estiver vazia', async () => {
    await expect(service.execute({
      user_id: 'user123',
      description: '',
      priority: Priority.ALTA,
      completed: true,
    })).rejects.toThrow('A descrição da tarefa é obrigatória.');
  });

  it('deve lançar erro se a prioridade for inválida', async () => {
    await expect(service.execute({
      user_id: 'user123',
      description: 'Descrição',
      // @ts-expect-error: teste proposital com prioridade inválida
      priority: 'URGENTE',
      completed: true,
    })).rejects.toThrow('Prioridade inválida. Use Alta, Média ou Baixa.');
  });
});