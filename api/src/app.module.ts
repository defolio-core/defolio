import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SpacesModule } from './spaces/spaces.module';
import { AuthModule } from './auth/auth.module';
import { LoggedUserMiddleware } from './common/middlewares/logged-user.middleware';
import { PrismaService } from './prisma.service';

// IMPORTS - START
// IMPORTS - END

@Module({
  imports: [
    // MODULE IMPORTS - START
    AuthModule,
    SpacesModule,
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
