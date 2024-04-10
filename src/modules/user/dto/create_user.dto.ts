import { IsString, IsNotEmpty } from 'class-validator';

// DTO (Data Transfer Object) for user entities
export class CreateDtoUser {
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
}
