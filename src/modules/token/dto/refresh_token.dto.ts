import { IsString, IsNotEmpty } from 'class-validator';

// DTO (Data Transfer Object) for token entities
export class RefreshDtoToken {
  // refresh of the token entity, should be a non-empty string
  @IsString({ message: 'refresh must be a string' })
  @IsNotEmpty({ message: 'refresh should not be empty' })
  readonly refresh: string;

  // userId of the token entity, should be a non-empty string
  @IsString({ message: 'userId must be a string' })
  @IsNotEmpty({ message: 'userId should not be empty' })
  readonly userId: string;
}
