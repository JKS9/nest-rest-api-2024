import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Define the shape of the document for the Foods collection
@Schema({ timestamps: true, versionKey: false }) // Enable timestamps and disable version key
export class Foods {
  @Prop({ required: true }) // Define title property with required constraint
  title: string; // Title of the food

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  // Optionally, you can define additional properties here
}

// Create the Mongoose schema based on the Foods class
export const FoodsSchema = SchemaFactory.createForClass(Foods);

// Define indexes for efficient querying
FoodsSchema.index({ title: 1 }); // Index for efficient searching by title
