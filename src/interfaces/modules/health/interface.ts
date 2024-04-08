// Interface for retrieving health status of the service
export interface IGetHealthOfTheService {
  // Date when the service started
  started: Date;
  // Uptime of the service in a human-readable format
  upTime: string;
  // Status code of the service
  status: number;
  // Version of the service
  version: string;
}
