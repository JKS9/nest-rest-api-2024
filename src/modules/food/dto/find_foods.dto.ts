import { IsMongoId } from 'class-validator';

// DTO (Data Transfer Object) for finding a food entity by its MongoDB ObjectId
export class FindDtoFood {
  // MongoDB ObjectId of the food entity
  @IsMongoId({ message: '_id must be a MongoDB ObjectId' })
  readonly _id: string;
}
