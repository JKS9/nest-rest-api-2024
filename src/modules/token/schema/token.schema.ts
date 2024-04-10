import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Define the shape of the document for the Tokens collection
@Schema({ timestamps: true, versionKey: false }) // Enable timestamps and disable version key
export class Token {
  @Prop({ required: true }) // Define title property with required constraint
  refresh: string; // Title of the Token

  @Prop({ expires: '6m' }) // Add expires option with 6 months TTL
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  // Optionally, you can define additional properties here
}

// Create the Mongoose schema based on the Foods class
export const TokenSchema = SchemaFactory.createForClass(Token);

// Define indexes for efficient querying
TokenSchema.index({ refresh: 1 }, { unique: true }); // Index for efficient searching by title
