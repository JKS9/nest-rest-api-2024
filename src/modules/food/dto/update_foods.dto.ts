import { IsString, IsNotEmpty } from 'class-validator';

// DTO (Data Transfer Object) for updating a food entity
export class UpdateDtoFood {
  // Updated title of the food entity, should be a non-empty string
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  readonly title: string;
}
