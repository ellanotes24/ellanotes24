import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const prisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  } as any;

  const jwt = { signAsync: jest.fn().mockResolvedValue('token') } as unknown as JwtService;
  const service = new AuthService(prisma, jwt);

  it('registers user', async () => {
    prisma.user.create.mockResolvedValue({ id: 'u1', email: 'test@example.com' });
    const result = await service.register({ username: 'test', email: 'test@example.com', password: 'Password123!' });
    expect(result.id).toBe('u1');
  });
});
