import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class IndexPostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The space id',
    type: String,
  })
  spaceId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The post slug to be indexed or reindexed',
    type: String,
    example: 'my-post-123',
  })
  slug: string;
}
