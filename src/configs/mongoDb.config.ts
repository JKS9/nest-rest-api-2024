// Interface for MongoDB configuration options
interface IMongoDbConfig {
  // Whether to use the new MongoDB connection string parser
  useNewUrlParser: boolean;
  // Maximum size of the MongoDB connection pool
  maxPoolSize: number;
  // Minimum size of the MongoDB connection pool
  minPoolSize: number;
  // Timeout in milliseconds for server selection
  serverSelectionTimeoutMS: number;
  // Timeout in milliseconds for socket operations
  socketTimeoutMS: number;
  // IP address family for the MongoDB connection
  family: number;
}

// MongoDB configuration options
export const option: IMongoDbConfig = {
  // Use the new MongoDB connection string parser
  useNewUrlParser: true,
  // Maximum size of the MongoDB connection pool
  maxPoolSize: 100,
  // Minimum size of the MongoDB connection pool
  minPoolSize: 10,
  // Timeout in milliseconds for server selection
  serverSelectionTimeoutMS: 5000,
  // Timeout in milliseconds for socket operations
  socketTimeoutMS: 45000,
  // IP address family for the MongoDB connection
  family: 4,
};
