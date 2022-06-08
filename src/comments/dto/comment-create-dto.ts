import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { CreateUserDto } from '../../users/dto';
import { CreatePostsDto } from '../../posts/dto';

export class CommentCreateDto {
  @IsNumber()
  public id: number;
  @IsString()
  @IsNotEmpty()
  public body: string;
  @IsBoolean()
  public published: boolean;
  @IsNumber()
  @IsNotEmpty()
  public authorId: number;
  @IsNumber()
  @IsNotEmpty()
  public postId: number;
  public author?: CreateUserDto;
  public Post?: CreatePostsDto;
}
