import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Web3Service } from 'src/web3/web3.service';
import { SpacesService } from '../spaces/spaces.service';

import { getPostMetadata } from '../common/utils/postMetadata';
import { FindAllPostsFilterDto } from './dto/find-all-posts-filter.dto';

const DefolioSpaceAbiJson = fs.readFileSync(
  path.join(__dirname, '../web3/abi/DeFolioSpace.json'),
  'utf8',
);

const DefolioSpaceAbi = JSON.parse(DefolioSpaceAbiJson);

@Injectable()
export class PostsService {
  constructor(
    private spaceService: SpacesService,
    private prismaService: PrismaService,
    private web3Service: Web3Service,
  ) {}

  async indexPost(id: string, postSlug: string) {
    const space = await this.spaceService.findOne(id);
    if (!space) {
      throw new Error('Space not found');
    }
    const contract = new this.web3Service.eth.Contract(
      DefolioSpaceAbi,
      space.address,
    );

    contract.setProvider(this.web3Service.currentProvider);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await contract.methods.getPostBySlug(postSlug).call();
    const cid = res[1];
    const metadata = await getPostMetadata(cid);

    const fields = {
      title: metadata.title,
      content: metadata.content,
      slug: metadata.slug,
    };

    return this.prismaService.spaceIndexedPost.upsert({
      where: {
        spaceId_slug: {
          spaceId: space.id,
          slug: postSlug,
        },
      },
      create: {
        spaceId: space.id,
        ...fields,
      },
      update: {
        ...fields,
      },
    });
  }

  async getPosts(
    filter: FindAllPostsFilterDto,
    pageOptions: { page: number; perPage: number } = { page: 1, perPage: 10 },
  ) {
    const where = filter.spaceId ? { spaceId: filter.spaceId } : {};
    return this.prismaService.spaceIndexedPost.findMany({
      where,
      take: pageOptions.perPage,
      skip: pageOptions.perPage * (pageOptions.page - 1),
    });
  }
}
