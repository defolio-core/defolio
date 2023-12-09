import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { PrismaService } from 'src/prisma.service';
import { SpacesController } from './spaces.controller';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module],
  providers: [PrismaService, SpacesService],
  controllers: [SpacesController],
})
export class SpacesModule {}
