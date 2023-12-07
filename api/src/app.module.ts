import { Module } from '@nestjs/common';
import { SpacesModule } from './spaces/spaces.module';

// IMPORTS - START
// IMPORTS - END

@Module({
  imports: [
    // MODULE IMPORTS - START
    SpacesModule,
    // MODULE IMPORTS - END
  ],
  controllers: [
    // MODULE CONTROLLERS - START
    // MODULE CONTROLLERS - END
  ],
  providers: [
    // MODULE PROVIDERS - START
    // MODULE PROVIDERS - END
  ],
})
export class AppModule {}
