import { IsNotEmpty, IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsString()
  @IsNotEmpty()
  public body: string;
}
