// src/controllers/user/tests/AuthUserController.spec.ts

import { AuthUserController } from '../AuthUserController';
import { AuthUserService } from '../../../services/user/AuthUserService';

jest.mock('../../../services/user/AuthUserService');

describe('AuthUserController', () => {
  it('deve autenticar o usuário e retornar o token', async () => {
    const mockSession = {
      id: 'user123',
      name: 'João',
      email: 'joao@email.com',
      token: 'jwt_token_abc123',
    };

    const fakeRequest = {
      body: {
        email: 'joao@email.com',
        password: '123456'
      }
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    (AuthUserService as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockSession)
    }));

    const controller = new AuthUserController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.json).toHaveBeenCalledWith(mockSession);
  });

  it('deve retornar status 400 se der erro na autenticação', async () => {
    const fakeRequest = {
      body: {
        email: 'joao@email.com',
        password: 'senhaerrada'
      }
    } as any;

    const fakeResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    (AuthUserService as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(new Error('Credenciais inválidas'))
    }));

    const controller = new AuthUserController();
    await controller.handle(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith({ error: 'Credenciais inválidas' });
  });
});