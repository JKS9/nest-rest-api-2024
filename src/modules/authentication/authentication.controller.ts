import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from 'src/swagger/user.swagger';
import { Token } from 'src/swagger/token.swagger';
import { CreateDtoUser } from '../user/dto/create_user.dto';
import { LoginDtoUser } from '../user/dto/login_user.dto';
import { AuthenticationService } from './authentication.service';
import { PasswordHashInterceptor, UserInterceptor } from 'src/interceptors/auth/auth.interceptor';
import { RefreshDtoToken } from '../token/dto/refresh_token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // Create a new auth
  @Post('register')
  @ApiResponse({ status: 201, description: 'Created users', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseInterceptors(PasswordHashInterceptor)
  async register(@Body() body: CreateDtoUser) {
    return await this.authenticationService.register(body);
  }

  // login an existing auth
  @Post('login')
  @ApiResponse({ status: 201, description: 'login', type: Token })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseInterceptors(UserInterceptor)
  async login(@Body() body: LoginDtoUser) {
    return await this.authenticationService.login(body);
  }

  // resfresh token
  @Post('refresh')
  @ApiResponse({ status: 201, description: 'refresh', type: Token })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseInterceptors(UserInterceptor)
  async refreshToken(@Body() body: RefreshDtoToken) {
    return await this.authenticationService.refreshToken(body);
  }
}
