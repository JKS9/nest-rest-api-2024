import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs'; // Importez bcryptjs
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class PasswordHashInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.password) {
      request.body.password = bcrypt.hashSync(request.body.password, 10);
    }
    return next.handle();
  }
}

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.email) {
      const user = await this.userService.findOne({ email: request.body.email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    if (request.body && request.body.userId) {
      const user = await this.userService.findOne({ _id: request.body.userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    return next.handle();
  }
}
