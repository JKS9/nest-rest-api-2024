import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'src/configs/env.config';

@Injectable()
export class AuthGuard implements CanActivate {
  // Function to check if the request is authorized
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // If no token is found in the request header, throw an UnauthorizedException
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Retrieve the secret key from the environment configuration
      const secretKey = config().secretKey.key;

      // Verify the token using the secret key
      const decodedToken = jwt.verify(token, secretKey);

      // Extract the payload from the decoded token and assign it to the request object
      const payload = decodedToken;
      request['user'] = payload;
    } catch {
      // If the token verification fails, throw an UnauthorizedException
      throw new UnauthorizedException();
    }

    // Return true to indicate that the request is authorized
    return true;
  }

  // Function to extract the token from the request header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
