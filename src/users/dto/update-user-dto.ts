import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;
  @IsNumber()
  public age: number;
  @IsString()
  public city: string;
}
