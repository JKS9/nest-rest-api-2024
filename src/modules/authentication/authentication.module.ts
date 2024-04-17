import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema'; // Importing User and its schema from the user module
import { Token, TokenSchema } from '../token/schema/token.schema'; // Importing Token and its schema from the token module
import { UserService } from '../user/user.service'; // Importing UserService from the user module
import { TokenService } from '../token/token.service'; // Importing TokenService from the token module
import { AuthenticationService } from './authentication.service'; // Importing AuthenticationService from the authentication module
import { AuthenticationController } from './authentication.controller'; // Importing AuthenticationController from the authentication module

@Module({
  controllers: [AuthenticationController], // Controllers provided by the module
  providers: [AuthenticationService, UserService, TokenService], // Services provided by the module
  imports: [
    // Importing MongooseModule to access the User model
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Importing MongooseModule to access the Token model
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
})
export class AuthenticationModule {}
