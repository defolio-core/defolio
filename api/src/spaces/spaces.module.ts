import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { PrismaService } from 'src/prisma.service';
import { SpacesController } from './spaces.controller';

@Module({
  providers: [PrismaService, SpacesService],
  controllers: [SpacesController],
})
export class SpacesModule {}
