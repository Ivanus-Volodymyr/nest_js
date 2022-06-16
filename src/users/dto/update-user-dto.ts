import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;
  @IsString()
  public age: string;
  @IsString()
  public city: string;
  @IsString()
  @IsOptional()
  readonly avatar: Express.Request['file'];
}
