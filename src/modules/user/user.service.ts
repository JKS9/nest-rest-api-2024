import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schema/user.schema';
import { CreateDtoUser } from './dto/create_user.dto';
import { LoginDtoUser } from './dto/login_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  // Create a new user
  async create(createDtoUser: CreateDtoUser) {
    return new this.UserModel(createDtoUser).save();
  }

  // Login user
  async login(body: LoginDtoUser) {
    const user = await this.UserModel.findOne({ email: body.email }).exec();

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    return passwordMatch ? user : null;
  }

  async findOne(criteria: Record<string, any>) {
    return await this.UserModel.findOne(criteria).exec();
  }

  // Delete a user by its ID
  async delete(id: string) {
    await this.UserModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
    }).exec();

    return true;
  }
}
