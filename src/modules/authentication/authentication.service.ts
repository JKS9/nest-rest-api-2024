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
    // Create a new user using the UserService
    const user = await this.userService.create(createDtoUser);
    // Remove the password from the user object before returning it
    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined,
    };

    return userWithoutPassword;
  }

  // Login a new user
  async login(loginDtoUser: LoginDtoUser) {
    // Attempt to login the user using the UserService
    const user = await this.userService.login(loginDtoUser);
    // If the user login fails, throw a NotFoundException
    if (!user) {
      throw new NotFoundException('Login Failed !');
    }

    // Remove the password from the user object before returning it
    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined,
    };

    // Generate an access token and a refresh token
    const token = await this.tokenService.generateToken(String(user._id));
    const refreshToken = await this.tokenService.generateRefreshToken();

    // Create a new refresh token for the user
    const refresh: CreateDtoToken = { refresh: refreshToken };
    await this.tokenService.create(refresh, String(user._id));

    return {
      token,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  // Refresh token
  async refreshToken(refreshToken: RefreshDtoToken) {
    // Find the existing refresh token in the database
    const existingToken = await this.tokenService.findOne({
      userId: new Types.ObjectId(refreshToken.userId),
      refresh: String(refreshToken.refresh),
    });

    // If the refresh token doesn't exist, throw a NotFoundException
    if (!existingToken) {
      throw new NotFoundException('Refresh token not found');
    }

    // Delete the existing refresh token
    await this.tokenService.delete(String(existingToken._id));

    // Generate a new access token and a new refresh token
    const newAccessToken = await this.tokenService.generateToken(String(refreshToken.userId));
    const newRefreshToken = await this.tokenService.generateRefreshToken();

    // Create a new refresh token for the user
    await this.tokenService.create({ refresh: newRefreshToken }, String(refreshToken.userId));

    // Retrieve the user information from the UserService
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
