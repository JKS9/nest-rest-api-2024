import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './configs/env.config';
import { option } from './configs/mongoDb.config';
import { FoodsModule } from './modules/food/foods.module';
import { HeatlhModule } from './modules/health/heatlh.module';
import { LoggingMiddleware } from './middlewares/logger/logger.middleware';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    // Importing MongooseModule to establish connection to MongoDB using configurations from env.config and mongoDb.config
    MongooseModule.forRoot(config().dataBase, option),
    // Importing module
    HeatlhModule,
    FoodsModule,
    AuthenticationModule,
    TokenModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
