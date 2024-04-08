import { IsInt, Min } from 'class-validator';

// DTO (Data Transfer Object) for pagination parameters
export class PaginationDto {
  // Page number, should be an integer greater than or equal to 1
  @IsInt({ message: 'Page must be an integer number' })
  @Min(1, { message: 'Page must not be less than 1' })
  readonly page: number;

  // Limit per page, should be an integer greater than or equal to 1
  @IsInt({ message: 'Limit must be an integer number' })
  @Min(1, { message: 'Limit must not be less than 1' })
  readonly limit: number;
}
