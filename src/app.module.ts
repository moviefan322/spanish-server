import { Module } from '@nestjs/common';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { StatsModule } from './stats/stats.module';
import { LessonModule } from './lessons/lessons.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    FlashcardsModule,
    StatsModule,
    LessonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: 'spanish-app',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
