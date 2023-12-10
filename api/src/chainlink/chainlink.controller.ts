import { Controller, Get, Param } from '@nestjs/common';
import { ChainlinkService } from './chainlink.service';

@Controller('chainlink')
export class ChainlinkController {
  constructor(private readonly chainlinkService: ChainlinkService) {}

  @Get('/:spaceAddress/:postSlug')
  async getPostInfo(
    @Param('spaceAddress') spaceAddress: string,
    @Param('postSlug') postSlug: string,
  ) {
    console.log('spaceAddress', spaceAddress);
    console.log('postSlug', postSlug);
    return this.chainlinkService.getPostInfo({ spaceAddress, postSlug });
  }
}
