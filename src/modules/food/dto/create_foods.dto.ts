import { IsString, IsNotEmpty } from 'class-validator';

// DTO (Data Transfer Object) for creating a food entity
export class CreateDtoFood {
  // Title of the food entity, should be a non-empty string
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  readonly title: string;
}
