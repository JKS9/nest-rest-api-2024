import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schema/token.schema';
import { TokenService } from './token.service';

@Module({
  controllers: [], // Controllers provided by the module
  providers: [TokenService], // Services provided by the module
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]), // Importing MongooseModule to access the Foods model
  ],
})
export class TokenModule {}
