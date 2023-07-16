import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateFlashcardDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === '1')
  correct: boolean;
}
