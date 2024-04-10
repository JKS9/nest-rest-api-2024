import { IsString, IsNotEmpty, IsDate, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

// DTO (Data Transfer Object) for user entities
export class BaseDtoUser {
  // MongoDB ObjectId for the user entity
  @IsMongoId({ message: '_id must be a MongoDB ObjectId' })
  readonly _id: Types.ObjectId;

  // name of the user entity, should be a non-empty string
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  readonly name: string;

  // email of the user entity, should be a non-empty string
  @IsString({ message: 'email must be a string' })
  @IsNotEmpty({ message: 'email should not be empty' })
  readonly email: string;

  // password of the user entity, should be a non-empty string
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password should not be empty' })
  readonly password: string;

  // Optional field for the creation date of the user entity
  @IsOptional()
  @IsDate()
  createdAt: Date;

  // Optional field for the last update date of the user entity
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
