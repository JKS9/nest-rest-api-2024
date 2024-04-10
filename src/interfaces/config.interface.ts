// Interface representing the configuration of the application
export interface IConfig {
  // Configuration related to the application
  app: {
    // The port on which the application will run
    port: string;
  };
  // The version of the application
  version: string;
  // Configuration related to the database
  dataBase: string;
  secretKey: {
    key: string;
  };
}
