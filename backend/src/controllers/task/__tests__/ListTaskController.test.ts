import { ListTaskController } from '../ListTaskController';
import { ListTaskService } from '../../../services/task/ListTaskService';

jest.mock('../../../services/task/ListTaskService');

describe('ListTaskController', () => {
  it('deve retornar status 201 com a lista de tarefas', async () => {
    const mockTasks = [
      { id: '1', description: 'Estudar', priority: 'Alta', completed: false },
      { id: '2', description: 'Treinar', priority: 'Média', completed: true },
    ];

    const fakeRequest = {
      user_id: 'user123',
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    (ListTaskService as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockTasks),
    }));

    const controller = new ListTaskController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(201);
    expect(fakeResponse.json).toHaveBeenCalledWith(mockTasks);
  });

  it('deve retornar status 400 em caso de erro', async () => {
    const fakeRequest = {
      user_id: 'user123',
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    (ListTaskService as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(new Error('Erro ao listar')),
    }));

    const controller = new ListTaskController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith({ error: 'Erro ao listar' });
  });
});