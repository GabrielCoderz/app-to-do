// src/services/task/__tests__/ListTaskService.spec.ts

import { ListTaskService } from '../ListTaskService';
import prisma from '../../../prisma';

jest.mock('../../../prisma', () => ({
  todo: {
    findMany: jest.fn(),
  },
}));

describe('ListTaskService', () => {
  const service = new ListTaskService();

  const mockTasks = [
    {
      id: '1',
      description: 'Estudar Jest',
      priority: 'ALTA',
      completed: true,
      userId: 'user123',
    },
    {
      id: '2',
      description: 'Ler sobre TypeScript',
      priority: 'MEDIA',
      completed: false,
      userId: 'user123',
    },
  ];

  it('deve listar todas as tasks de um usuário', async () => {
    (prisma.todo.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const result = await service.execute({ user_id: 'user123' });

    expect(result).toEqual(mockTasks);
    expect(prisma.todo.findMany).toHaveBeenCalledWith({
      where: {
        userId: 'user123',
      },
    });
  });
});