import { IsString, IsNotEmpty, IsDate, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

// DTO (Data Transfer Object) for food entities
export class BaseDtoFood {
  // MongoDB ObjectId for the food entity
  @IsMongoId({ message: '_id must be a MongoDB ObjectId' })
  readonly _id: Types.ObjectId;

  // Title of the food entity, should be a non-empty string
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  readonly title: string;

  // Optional field for the creation date of the food entity
  @IsOptional()
  @IsDate()
  createdAt: Date;

  // Optional field for the last update date of the food entity
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
