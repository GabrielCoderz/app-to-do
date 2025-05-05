import { AuthUserService } from '../AuthUserService';
import prismaClient from '../../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

jest.mock('../../../prisma', () => ({
  user: {
    findFirst: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('AuthUserService', () => {
  const service = new AuthUserService();

  const mockUser = {
    id: 'user123',
    name: 'Teste',
    email: 'teste@email.com',
    password: 'hashed_password',
  };

  const jwtMock = 'fake.jwt.token';

  beforeEach(() => {
    process.env.JWT_SECRET = 'secret';
  });

  it('deve autenticar usuário e retornar token', async () => {
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);
    (sign as jest.Mock).mockReturnValue(jwtMock);

    const result = await service.execute({
      email: 'teste@email.com',
      password: 'senha123',
    });

    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      token: jwtMock,
    });
  });

  it('deve lançar erro se o usuário não existir', async () => {
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        email: 'naoexiste@email.com',
        password: 'senha123',
      })
    ).rejects.toThrow('Email/senha incorreto');
  });

  it('deve lançar erro se a senha for inválida', async () => {
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({
        email: mockUser.email,
        password: 'senhaerrada',
      })
    ).rejects.toThrow('Email/password incorreto');
  });

  it('deve lançar erro se JWT_SECRET não estiver definido', async () => {
    delete process.env.JWT_SECRET;
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        email: mockUser.email,
        password: 'senha123',
      })
    ).rejects.toThrow('JWT_SECRET não definida no .env');
  });
});