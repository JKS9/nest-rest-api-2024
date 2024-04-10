import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { Token, TokenSchema } from '../token/schema/token.schema';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  controllers: [AuthenticationController], // Controllers provided by the module
  providers: [AuthenticationService, UserService, TokenService], // Services provided by the module
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Importing MongooseModule to access the Foods model
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]), // Importing MongooseModule to access the Foods model
  ],
})
export class AuthenticationModule {}
