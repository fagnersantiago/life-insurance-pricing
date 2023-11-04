import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ErrorInterceptor } from './users/errors/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
