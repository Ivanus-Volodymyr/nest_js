import { CreatePostsDto } from '../../posts/dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { CommentCreateDto } from '../../comments/dto';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNumber()
  public age: number;

  @IsString()
  @Length(2, 10)
  public city: string;

  @IsBoolean()
  public status: boolean;
  @IsString()
  @Length(2, 20)
  @IsNotEmpty()
  readonly password: string;
  public posts?: CreatePostsDto[];
  public comments?: CommentCreateDto[];
}
