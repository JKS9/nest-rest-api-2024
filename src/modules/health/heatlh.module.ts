import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController], // Declare the controllers used in this module
  providers: [HealthService], // Declare the services used in this module
  imports: [], // Declare any external modules that need to be imported (currently empty)
})
export class HeatlhModule {} // Define the HealthModule class
