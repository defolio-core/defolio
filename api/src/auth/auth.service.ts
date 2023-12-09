import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as jwt from 'jsonwebtoken';
import { SiweMessage, generateNonce } from 'siwe';

const NONCE_EXPIRATION = 1000 * 60 * 5; // 5 minutes

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async generateNonce() {
    const nonceSession = await this.prismaService.nonceSession.create({
      data: {
        nonce: generateNonce(),
        expiresAt: new Date(new Date().getTime() + NONCE_EXPIRATION),
      },
    });
    return nonceSession;
  }

  async verify(nonceSessionId: string, message: string, signature: string) {
    const nonceSession = await this.prismaService.nonceSession.findUnique({
      where: {
        id: nonceSessionId,
        expiresAt: {
          gte: new Date(),
        },
      },
    });
    if (!nonceSession) {
      throw new UnauthorizedException('Nonce session expired or not found');
    }
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.verify({ signature });
    if (fields.data.nonce !== nonceSession.nonce) {
      throw new UnauthorizedException('Nonce mismatch');
    }
    const address = fields.data.address.toLocaleLowerCase();
    const user = await this.prismaService.user.upsert({
      where: { address },
      create: { address },
      update: {},
    });
    const token = jwt.sign(
      { id: user.id, address: user.address },
      process.env.JWT_SECRET_KEY,
    );
    return {
      token,
    };
  }
}
