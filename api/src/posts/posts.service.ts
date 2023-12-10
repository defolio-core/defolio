import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Web3Service } from 'src/web3/web3.service';
import { SpacesService } from '../spaces/spaces.service';

import { getPostMetadata } from '../common/utils/postMetadata';
import { FindAllPostsFilterDto } from './dto/find-all-posts-filter.dto';
import { CreateScheduledPostDto } from './dto/create-scheduler-post.dto';
import { Prisma, User } from '@prisma/client';
import { Cron } from '@nestjs/schedule';

const DefolioSpaceAbiJson = fs.readFileSync(
  path.join(__dirname, '../abi/DeFolioSpace.json'),
  'utf8',
);

const DefolioSpaceAbi = JSON.parse(DefolioSpaceAbiJson);

const applyPostWhereFilterFromUserContext = (
  user: User | null,
  where: Prisma.SpaceIndexedPostWhereInput,
) => {
  where.OR = [
    {
      scheduled: false,
    },
  ];

  if (user) {
    where.OR.push({
      OR: [
        {
          space: {
            owner: {
              address: {
                equals: user?.address,
              },
            },
          },
        },
      ],
    });
  }
};

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
      cover: metadata.cover,
      content: metadata.content,
      slug: metadata.slug,
      authorAddress: metadata.author?.address,
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

  @Cron('45 * * * * *')
  async indexScheduledPublishedPosts() {
    const scheduledPublishedPosts =
      await this.prismaService.spaceIndexedPost.findMany({
        where: {
          scheduled: true,
          scheduledToDate: {
            lte: new Date(),
          },
        },
      });
    console.log(
      'Indexing scheduled published posts',
      scheduledPublishedPosts.map((p) => p.id),
    );
    for (const post of scheduledPublishedPosts) {
      await this.indexPost(post.spaceId, post.slug);
      await this.prismaService.spaceIndexedPost.update({
        where: {
          id: post.id,
        },
        data: {
          scheduled: false,
        },
      });
    }
  }

  async createScheduledPost(dto: CreateScheduledPostDto) {
    const space = await this.spaceService.findOne(dto.spaceId);
    if (!space) {
      throw new Error('Space not found');
    }
    return this.prismaService.spaceIndexedPost.create({
      data: {
        spaceId: space.id,
        title: dto.title,
        cover: dto.cover,
        slug: dto.slug,
        authorAddress: dto.authorAddress,
        scheduled: true,
        scheduledCid: dto.cid,
        scheduledToDate: new Date(dto.date),
        content: dto.content,
      },
    });
  }

  async getPosts(
    user: User | null,
    filter: FindAllPostsFilterDto,
    pageOptions: { page: number; perPage: number } = { page: 1, perPage: 10 },
  ) {
    const where: Prisma.SpaceIndexedPostWhereInput = {};
    if (filter.spaceId) {
      where.space = {
        slug: filter.spaceId,
      };
    }

    applyPostWhereFilterFromUserContext(user, where);

    return this.prismaService.spaceIndexedPost.findMany({
      where,
      take: pageOptions.perPage,
      skip: pageOptions.perPage * (pageOptions.page - 1),
    });
  }

  async getPostBySlugs(user: User | null, spaceSlug: string, postSlug: string) {
    const where: Prisma.SpaceIndexedPostWhereInput = {
      slug: postSlug,
      space: {
        slug: spaceSlug,
      },
    };

    applyPostWhereFilterFromUserContext(user, where);

    return this.prismaService.spaceIndexedPost.findFirst({
      where,
    });
  }
}
