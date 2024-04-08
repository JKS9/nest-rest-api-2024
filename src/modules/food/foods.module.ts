import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Foods, FoodsSchema } from './schemas/foods.schema';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

@Module({
  controllers: [FoodsController], // Controllers provided by the module
  providers: [FoodsService], // Services provided by the module
  imports: [
    MongooseModule.forFeature([{ name: Foods.name, schema: FoodsSchema }]), // Importing MongooseModule to access the Foods model
  ],
})
export class FoodsModule {}
