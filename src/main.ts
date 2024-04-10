import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from './configs/env.config';

async function bootstrap() {
  // Create an instance of the Nest.js application
  const app: INestApplication = await NestFactory.create(AppModule);

  // Set up global validation using ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      // Automatically transform incoming payloads to their DTO instances
      transform: true,
      // Enable implicit conversion of primitive types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configure Swagger documentation
  const configSwagger: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Start API Nest.js')
    .setDescription('The Start API Nest.js description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  // Generate Swagger document
  const document: OpenAPIObject = SwaggerModule.createDocument(app, configSwagger);

  // Setup Swagger UI endpoint
  SwaggerModule.setup('swagger', app, document);

  // Start the Nest.js application
  await app.listen(config().app.port);
}

// Call the bootstrap function to start the application
bootstrap();
