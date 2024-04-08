import { IConfig } from 'src/interfaces/config.interface';

// This function exports the configuration object for the application
export const config = (): IConfig => ({
  // Configuration for the application
  app: {
    // Port for the application server
    port: process.env.PORT,
  },
  // Version of the application
  version: process.env.VERSION_APP,
  // Database configuration
  dataBase: {
    // MongoDB connection URL
    url: process.env.MONGO_URL,
  },
});
