import { IConfig } from 'src/interfaces/config.interface';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

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
  dataBase: process.env.MONGO_URL as string,
  secretKey: {
    key: process.env.SECRETJWT || '661526a0e58b677bd5724dbf',
  },
});
