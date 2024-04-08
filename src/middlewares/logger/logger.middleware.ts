import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, RequestParamHandler, RouterOptions} from 'express';
import * as winston from 'winston';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger: winston.Logger;

  constructor() {
    // Create a Winston logger instance
    this.logger = winston.createLogger({
      level: 'info', // Log level
      format: winston.format.combine(
        winston.format.timestamp(), // Add a timestamp to each log
        winston.format.json(), // JSON format for the logs
      ),
      transports: [
        new winston.transports.Console(), // Write logs to the console
      ],
    });
  }

  // Middleware function to log incoming requests and outgoing responses
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query } = req;
    const startTime = Date.now();

    // Log request information
    const requestInfo = `Request: ${method} ${originalUrl} - Query: ${JSON.stringify(
      query,
    )} - Body: ${JSON.stringify(body)}`;
    this.logger.info(requestInfo);

    // Log response information when the response is finished
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;

      const responseInfo = `Response: ${statusCode} - ${duration}ms`;
      this.logger.info(responseInfo);
    });

    next(); // Call the next middleware in the chain
  }
}
