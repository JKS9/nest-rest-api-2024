import { ApiProperty } from '@nestjs/swagger';

export class Foods {
  @ApiProperty({ default: '507f1f77bcf86cd799439011' }) // Swagger annotation for API documentation
  _id: Date; // Define _id property for Foods class

  @ApiProperty({ default: 'Pizza' }) // Swagger annotation for API documentation
  title: string; // Define title property for Foods class

  @ApiProperty({ default: '2024-04-02T15:57:28.858Z' }) // Swagger annotation for API documentation
  createdAt: Date; // Define createdAt property for Foods class

  @ApiProperty({ default: '2024-04-02T15:57:28.858Z' }) // Swagger annotation for API documentation
  updatedAt: Date; // Define updatedAt property for Foods class
}
