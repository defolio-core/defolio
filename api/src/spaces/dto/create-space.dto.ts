import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSpaceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the space',
    type: String,
    example: 'The Space',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The logo of the space IPFS CID',
    type: String,
  })
  logo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The description of the space',
    type: String,
    example: 'My personal space',
  })
  slug: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The contract address of the space',
    type: String,
    example: '0x1234...5678',
  })
  address: string;
}
