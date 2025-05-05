import { CreateTaskController } from '../CreateTaskController';
import { CreateTaskService } from '../../../services/task/CreateTaskService';

jest.mock('../../../services/task/CreateTaskService');

describe('CreateTaskController', () => {
  it('deve criar uma task e retornar status 200 com o JSON da task', async () => {
    const fakeRequest = {
      body: {
        description: 'Realizar teste técnico',
        priority: 'Alta',
        completed: true,
      },
      user_id: 'user123',
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const fakeTask = {
      id: 'task123',
      user_id: 'user123',
      description: 'Realizar teste técnico',
      priority: 'Alta',
      completed: true,
    };

    (CreateTaskService as jest.Mock).mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue(fakeTask),
      };
    });

    const controller = new CreateTaskController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.json).toHaveBeenCalledWith(fakeTask);
  });

  it('deve retornar erro 400 se ocorrer erro no service', async () => {
    const fakeRequest = {
      body: {
        description: '',
        priority: 'Alta',
        completed: false,
      },
      user_id: 'user123',
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    (CreateTaskService as jest.Mock).mockImplementation(() => {
      return {
        execute: jest.fn().mockRejectedValue(new Error('Descrição inválida')),
      };
    });

    const controller = new CreateTaskController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith({ error: 'Descrição inválida' });
  });
});