import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Token } from './schema/token.schema';
import { CreateDtoToken } from './dto/create_token.dto';
import { config } from 'src/configs/env.config';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private TokenModel: Model<Token>) {}

  // Create a new token
  async create(createDtoToken: CreateDtoToken, id: string) {
    const existingToken = await this.TokenModel.findOne({
      userId: new Types.ObjectId(id),
    }).exec();

    if (existingToken) {
      await this.delete(String(existingToken._id));
    }

    const newToken = await this.TokenModel.create({
      userId: new Types.ObjectId(id),
      refresh: createDtoToken.refresh,
    });

    return newToken;
  }

  async findOne(criteria: Record<string, any>) {
    return await this.TokenModel.findOne(criteria).exec();
  }

  // Delete a token by its ID
  async delete(id: string) {
    await this.TokenModel.deleteOne({
      _id: new Types.ObjectId(id),
    }).exec();
    return true;
  }

  async generateToken(userId: string) {
    return await jwt.sign({ userId }, config().secretKey.key, { expiresIn: '6h' });
  }

  async generateRefreshToken() {
    return uuidv4();
  }
}
