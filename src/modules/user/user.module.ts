import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';

@Module({
  controllers: [], // Controllers provided by the module
  providers: [UserService], // Services provided by the module
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Importing MongooseModule to access the Foods model
  ],
})
export class UserModule {}
