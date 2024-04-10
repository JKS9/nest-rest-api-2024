import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ default: '507f1f77bcf86cd799439011' }) // Swagger annotation for API documentation
  _id: Date; // Define _id property for Foods class

  @ApiProperty({ default: 'Etienne' }) // Swagger annotation for API documentation
  name: string; // Define title property for Foods class

  @ApiProperty({ default: 'etienne' }) // Swagger annotation for API documentation
  email: string; // Define title property for Foods class

  @ApiProperty({ default: '2024-04-02T15:57:28.858Z' }) // Swagger annotation for API documentation
  createdAt: Date; // Define createdAt property for Foods class

  @ApiProperty({ default: '2024-04-02T15:57:28.858Z' }) // Swagger annotation for API documentation
  updatedAt: Date; // Define updatedAt property for Foods class
}
