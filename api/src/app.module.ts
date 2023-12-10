import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SpacesModule } from './spaces/spaces.module';
import { AuthModule } from './auth/auth.module';
import { LoggedUserMiddleware } from './common/middlewares/logged-user.middleware';
import { PrismaService } from './prisma.service';
import { PostsModule } from './posts/posts.module';
import { ChainlinkModule } from './chainlink/chainlink.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    // MODULE IMPORTS - START
    ScheduleModule.forRoot(),
    AuthModule,
    SpacesModule,
    PostsModule,
    ChainlinkModule,
    // MODULE IMPORTS - END
  ],
  controllers: [
    // MODULE CONTROLLERS - START
    // MODULE CONTROLLERS - END
  ],
  providers: [
    // MODULE PROVIDERS - START
    PrismaService,
    // MODULE PROVIDERS - END
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggedUserMiddleware).forRoutes('*');
  }
}
