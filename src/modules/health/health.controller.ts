import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthService } from './health.service';

import { Health } from 'src/swagger/health.class';

import { IGetHealthOfTheService } from 'src/interfaces/modules/health/interface';

@ApiTags('Health') // Define Swagger tag for the controller
@Controller('/') // Define the controller route
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  // Define GET endpoint to retrieve service health
  @Get()
  @ApiResponse({ status: 200, description: 'Returns service health', type: Health }) // Define Swagger response documentation
  @ApiResponse({ status: 404, description: 'Not Found' }) // Define Swagger response documentation
  getHello(): IGetHealthOfTheService {
    // Define controller method
    return this.healthService.getHealthOfTheService(); // Call service method to retrieve service health
  }
}
