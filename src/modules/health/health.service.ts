import { Injectable } from '@nestjs/common';

import { IGetHealthOfTheService } from 'src/interfaces/modules/health/interface';

const startTimestamp: number = Date.now(); // Get the start timestamp of the service

@Injectable()
export class HealthService {
  // Method to retrieve the health of the service
  getHealthOfTheService(): IGetHealthOfTheService {
    // Calculate the uptime of the service in days, hours, minutes, and seconds
    const { days, hours, minutes, seconds } = (() => {
      const totalSeconds: number = Math.floor((Date.now() - startTimestamp) / 1000); // Calculate the total number of seconds since the service started
      return {
        days: Math.floor(totalSeconds / (3600 * 24)), // Calculate the number of days
        hours: Math.floor((totalSeconds % (3600 * 24)) / 3600), // Calculate the number of remaining hours
        minutes: Math.floor((totalSeconds % 3600) / 60), // Calculate the number of remaining minutes
        seconds: totalSeconds % 60, // Calculate the number of remaining seconds
      };
    })();

    // Construct the health object with the service start time, uptime, status, and version
    return {
      started: new Date(startTimestamp), // Set the service start time
      upTime: `${days}d ${hours}h ${minutes}m ${seconds}s`, // Set the service uptime
      status: 200, // Set the status code
      version: process.env.version_app || '0.0.1', // Set the service version
    };
  }
}
