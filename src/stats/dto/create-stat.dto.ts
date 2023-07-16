import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateStatDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  lessonId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  score: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  outOf: number;
}
