// src/controllers/user/CreateUserController.spec.ts
import { CreateUserController } from '../CreateUserController';
import { CreateUserService } from '../../../services/user/CreateUserService';

jest.mock('../../../services/user/CreateUserService');

describe('CreateUserController', () => {
  it('deve retornar status 201 e json com usuário criado', async () => {
    const fakeRequest = {
      body: {
        name: 'Maria',
        email: 'maria@example.com',
        password: '123456',
      },
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const mockUser = {
      id: 'u1',
      name: 'Maria',
      email: 'maria@example.com',
    };

    (CreateUserService as jest.Mock).mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue(mockUser),
      };
    });

    const controller = new CreateUserController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(201);
    expect(fakeResponse.json).toHaveBeenCalledWith(mockUser);
  });

  it('deve retornar erro 400 se o service lançar erro', async () => {
    const fakeRequest = {
      body: {
        name: 'Carlos',
        email: '',
        password: 'senha123',
      },
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    (CreateUserService as jest.Mock).mockImplementation(() => {
      return {
        execute: jest.fn().mockRejectedValue(new Error('Email incorreto')),
      };
    });

    const controller = new CreateUserController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith({ error: 'Email incorreto' });
  });
});