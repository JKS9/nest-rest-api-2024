import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define the shape of the document for the User collection
@Schema({ timestamps: true, versionKey: false }) // Enable timestamps and disable version key
export class User {
  @Prop({ required: true }) // Define title property with required constraint
  name: string; // name of the User

  @Prop({ required: true }) // Define title property with required constraint
  email: string; // name of the User

  @Prop({ required: true }) // Define title property with required constraint
  password: string; // name of the User

  // Optionally, you can define additional properties here
}

// Create the Mongoose schema based on the Foods class
export const UserSchema = SchemaFactory.createForClass(User);

// Define indexes for efficient querying
UserSchema.index({ email: 1 }, { unique: true }); // Index for unique email
