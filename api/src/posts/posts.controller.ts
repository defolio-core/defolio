import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { LoggedUser } from 'src/common/decorators/LoggedUser';
import { IndexPostDto } from './dto/index-post.dto';
import { User } from '@prisma/client';
import { PostsService } from './posts.service';
import { SpacesService } from '../spaces/spaces.service';
import { FindAllPostsFilterDto } from './dto/find-all-posts-filter.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly spacesService: SpacesService,
  ) {}

  @Post('/index')
  async indexPost(
    @LoggedUser() user: User,
    @Body() input: IndexPostDto,
  ): Promise<any> {
    if (!user) {
      throw new UnauthorizedException();
    }
    const space = await this.spacesService.findOne(input.spaceId);
    if (space.ownerId !== user.id) {
      throw new ForbiddenException();
    }
    return this.postsService.indexPost(input.spaceId, input.slug);
  }

  @Get()
  async getPosts(@Query() query: FindAllPostsFilterDto): Promise<any> {
    return this.postsService.getPosts(query);
  }
}
