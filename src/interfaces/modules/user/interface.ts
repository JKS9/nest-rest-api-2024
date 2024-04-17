export interface IUser {
  _id: Date; // Unique identifier for the user
  name: string; // User's name
  email: string; // User's email address
  createdAt: Date; // Date and time when the user was created
  updatedAt: Date; // Date and time when the user was last updated
}
