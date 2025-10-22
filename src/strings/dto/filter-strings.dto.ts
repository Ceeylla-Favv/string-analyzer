import { IsOptional, IsBooleanString, IsNumberString, IsString } from 'class-validator';

export class FilterStringsDto {
  @IsOptional()
  @IsBooleanString()
  is_palindrome?: string;

  @IsOptional()
  @IsNumberString()
  min_length?: string;

  @IsOptional()
  @IsNumberString()
  max_length?: string;

  @IsOptional()
  @IsNumberString()
  word_count?: string;

  @IsOptional()
  @IsString()
  contains_character?: string;
}
