import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { LoggedUser } from 'src/common/decorators/LoggedUser';
import { User } from '@prisma/client';

@Controller('spaces')
export class SpacesController {
  constructor(private spacesService: SpacesService) {}

  @Get('/')
  public async findAll(@LoggedUser() user: User): Promise<any[]> {
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.spacesService.findAll(user);
  }

  @Get('/:id')
  public async findOne(@Param() { id }: { id: string }): Promise<any> {
    return this.spacesService.findOne(id);
  }

  @Post('/')
  async create(
    @LoggedUser() user: User,
    @Body() input: CreateSpaceDto,
  ): Promise<any> {
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.spacesService.create(user, input);
  }
}
