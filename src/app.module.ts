import { Module } from '@nestjs/common';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { StatsModule } from './stats/stats.module';
import { LessonModule } from './lessons/lessons.module';

@Module({
  imports: [FlashcardsModule, StatsModule, LessonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
