import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class PasswordHashInterceptor implements NestInterceptor {
  // Intercept method to hash the password before processing the request
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Check if the request body contains a password field
    if (request.body && request.body.password) {
      // Hash the password using bcryptjs with salt rounds set to 10
      request.body.password = bcrypt.hashSync(request.body.password, 10);
    }
    return next.handle();
  }
}

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  // Intercept method to validate user existence based on email or userId in the request body
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    // Check if the request body contains an email field
    if (request.body && request.body.email) {
      // Find a user by email using the UserService
      const user = await this.userService.findOne({ email: request.body.email });

      // If user not found, throw a NotFoundException
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    // Check if the request body contains a userId field
    if (request.body && request.body.userId) {
      // Find a user by userId using the UserService
      const user = await this.userService.findOne({ _id: request.body.userId });

      // If user not found, throw a NotFoundException
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    return next.handle();
  }
}
