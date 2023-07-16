import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stat } from './stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stat])],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
