import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({ default: '507f1f77bcf86cd799439011Etienne' }) // Swagger annotation for API documentation
  token: string; // token title property for Foods class

  @ApiProperty({ default: '507f1f77bcf86cd799439011etienne' }) // Swagger annotation for API documentation
  refreshToken: string; // Define refreshToken property for Foods class
}
