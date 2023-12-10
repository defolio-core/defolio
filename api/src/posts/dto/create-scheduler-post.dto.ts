import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateScheduledPostDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The space id',
  })
  spaceId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The post title',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The post slug',
  })
  slug: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The post cover CID',
  })
  cover: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The post content',
  })
  content: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The author address',
  })
  authorAddress: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The post metadata cid',
  })
  cid: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The scheduled date ISO string',
  })
  date: string;
}
