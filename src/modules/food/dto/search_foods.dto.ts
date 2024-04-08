import { IsString } from 'class-validator';

// DTO (Data Transfer Object) for searching food entities by title
export class SearchDtoFood {
  // Title of the food entity to search for
  @IsString({ message: 'Title must be a string' })
  readonly title: string;
}
