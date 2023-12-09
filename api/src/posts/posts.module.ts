import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from '../prisma.service';
import { SpacesService } from '../spaces/spaces.service';
import { Web3Service } from '../web3/web3.service';

@Module({
  providers: [PrismaService, SpacesService, Web3Service, PostsService],
  controllers: [PostsController],
  imports: [],
})
export class PostsModule {}
