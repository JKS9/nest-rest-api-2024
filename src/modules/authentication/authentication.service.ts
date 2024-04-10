import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDtoUser } from '../user/dto/login_user.dto';
import { CreateDtoUser } from '../user/dto/create_user.dto';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { CreateDtoToken } from '../token/dto/create_token.dto';
import { RefreshDtoToken } from '../token/dto/refresh_token.dto';
import { Types } from 'mongoose';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  // Create a new user
  async register(createDtoUser: CreateDtoUser) {
    const user = await this.userService.create(createDtoUser);
    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined,
    };

    return userWithoutPassword;
  }

  // Login a new user
  async login(loginDtoUser: LoginDtoUser) {
    const user = await this.userService.login(loginDtoUser);
    if (user === null) {
      throw new NotFoundException('Login Failed !');
    } else if (user && user._id) {
      const userWithoutPassword = {
        ...user.toObject(),
        password: undefined,
      };

      const token = await this.tokenService.generateToken(String(user._id));
      console.log(String(user._id));
      const refreshToken = await this.tokenService.generateRefreshToken();

      const refresh: CreateDtoToken = { refresh: refreshToken };
      const saveToken = await this.tokenService.create(refresh, String(user._id));
      if (saveToken) {
        return {
          token,
          refreshToken,
          user: userWithoutPassword,
        };
      }
    }
  }

  // Login a new user
  async refreshToken(refreshToken: RefreshDtoToken) {
    const existingToken = await this.tokenService.findOne({
      userId: new Types.ObjectId(refreshToken.userId),
      refresh: String(refreshToken.refresh),
    });

    if (!existingToken) {
      throw new NotFoundException('Refresh token not found');
    }

    await this.tokenService.delete(String(existingToken._id));

    const newAccessToken = await this.tokenService.generateToken(String(refreshToken.userId));
    const newRefreshToken = await this.tokenService.generateRefreshToken();

    await this.tokenService.create({ refresh: newRefreshToken }, String(refreshToken.userId));
    const user = await this.userService.findOne({ _id: refreshToken.userId });
    return {
      token: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        ...user.toObject(),
        password: undefined,
      },
    };
  }
}
