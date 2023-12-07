import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

function extractTokenFromHeader(request: any): string | null {
  if (!request.headers.authorization) {
    return null;
  }
  const [bearer, token] = request.headers.authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return null;
  }
  return token;
}

@Injectable()
export class LoggedUserMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(
    req: Request & { user: User | null },
    res: Response,
    next: () => any,
  ) {
    try {
      const token = extractTokenFromHeader(req);
      if (!token) {
        req.user = null;
        next();
        return;
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
        id: string;
      } | null;
      if (!payload) {
        req.user = null;
        next();
        return;
      }
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
      });
      if (user) {
        req.user = user;
      }
    } catch (error) {
      req.user = null;
    }
    next();
  }
}
