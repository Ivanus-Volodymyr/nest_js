import { CreatePostsDto } from '../../posts/dto/create-posts-dto';

export class CreateUserDto {
  id: number;
  public name: string;
  public email: string;
  public age: number;
  public city: string;
  public status: boolean;
  readonly password: string;
  public posts?: CreatePostsDto[];
}
