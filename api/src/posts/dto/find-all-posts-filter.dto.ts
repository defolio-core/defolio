import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindAllPostsFilterDto {
  @IsString()
  @ApiProperty({
    description: 'Find all posts by space id',
    type: String,
  })
  spaceId?: string;
}
