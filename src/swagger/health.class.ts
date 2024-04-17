import { ApiProperty } from '@nestjs/swagger';

export class Health {
  @ApiProperty({ default: '2024-04-02T15:57:28.858Z' }) // Swagger annotation for API documentation
  started: Date; // Property representing the start time of the service

  @ApiProperty({ default: '0d 0h 0m 21s' }) // Swagger annotation for API documentation
  upTime: string; // Property representing the uptime of the service

  @ApiProperty({ default: 200 }) // Swagger annotation for API documentation
  status: number; // Property representing the status code of the service

  @ApiProperty({ default: '0.0.1' }) // Swagger annotation for API documentation
  version: string; // Property representing the version of the service
}
