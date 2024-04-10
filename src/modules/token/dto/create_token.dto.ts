import { IsString, IsNotEmpty } from 'class-validator';

// DTO (Data Transfer Object) for token entities
export class CreateDtoToken {
  // Title of the token entity, should be a non-empty string
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  readonly refresh: string;
}
