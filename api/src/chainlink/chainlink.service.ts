import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChainlinkService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPostInfo({
    spaceAddress,
    postSlug,
  }: {
    spaceAddress: string;
    postSlug: string;
  }) {
    const post = await this.prismaService.spaceIndexedPost.findFirst({
      where: {
        space: {
          address: spaceAddress.toLocaleLowerCase(),
        },
        slug: postSlug,
      },
    });
    if (!post || post.scheduledToDate > new Date()) {
      throw new NotFoundException('Post not found');
    }
    return {
      cid: post.scheduledCid,
    };
  }
}
