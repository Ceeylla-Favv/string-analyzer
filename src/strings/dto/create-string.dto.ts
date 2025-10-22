import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStringDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  value: string;
}
