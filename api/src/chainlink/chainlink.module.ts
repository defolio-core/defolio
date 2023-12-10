import { Module } from '@nestjs/common';
import { ChainlinkService } from './chainlink.service';
import { ChainlinkController } from './chainlink.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, ChainlinkService],
  controllers: [ChainlinkController],
})
export class ChainlinkModule {}
