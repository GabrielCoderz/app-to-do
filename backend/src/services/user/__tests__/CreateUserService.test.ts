// src/services/user/__tests__/CreateUserService.spec.ts

import { CreateUserService } from '../CreateUserService';
import prisma from '../../../prisma';
import { hash } from 'bcryptjs';

jest.mock('../../../prisma', () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('CreateUserService', () => {
  const service = new CreateUserService();

  const mockInput = {
    name: 'Teste',
    email: 'teste@email.com',
    password: 'senha123',
  };

  const mockUser = {
    id: 'user123',
    name: mockInput.name,
    email: mockInput.email,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um usuário com sucesso', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue('hashed_password');
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.execute(mockInput);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: mockInput.email },
    });

    expect(hash).toHaveBeenCalledWith(mockInput.password, 8);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: mockInput.name,
        email: mockInput.email,
        password: 'hashed_password',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    expect(result).toEqual(mockUser);
  });

  it('deve lançar erro se o email estiver vazio', async () => {
    await expect(
      service.execute({ ...mockInput, email: '' })
    ).rejects.toThrow('Email incorreto');
  });

  it('deve lançar erro se o usuário já existir', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    await expect(service.execute(mockInput)).rejects.toThrow(
      'Usuário/Email já existe'
    );
  });
});