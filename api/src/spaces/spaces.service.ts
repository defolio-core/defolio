import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { User } from '@prisma/client';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class SpacesService {
  constructor(
    private prismaService: PrismaService,
    private web3Service: Web3Service,
  ) {}

  async findOne(id: string) {
    return this.prismaService.space.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });
  }

  public async findAll(user: User): Promise<any[]> {
    return this.prismaService.space.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(user: User, input: CreateSpaceDto) {
    return this.prismaService.space.create({
      data: {
        ...input,
        ownerId: user.id,
      },
    });
  }
}
