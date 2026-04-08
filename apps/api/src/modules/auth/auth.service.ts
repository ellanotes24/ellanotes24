import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(dto: { username: string; email: string; password: string }) {
    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email.toLowerCase(),
        passwordHash,
        status: 'PENDING_VERIFICATION',
        profile: { create: {} },
        wallets: {
          createMany: {
            data: ['CREDITS', 'COINS', 'CASH', 'BONUS', 'REFERRAL', 'PENDING', 'LOCKED', 'PROMO'].map((type) => ({ type: type as any })),
          },
        },
      },
    });

    return { id: user.id, email: user.email, message: 'Registration successful. Verify email to activate account.' };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user || !(await argon2.verify(user.passwordHash, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: await this.jwt.signAsync({ sub: user.id, role: user.role }),
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
