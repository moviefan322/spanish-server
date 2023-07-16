import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats() {
    return this.statsService.getStats();
  }

  @Post()
  async create(@Body() body: CreateStatDto) {
    console.log(body);
    const stats = await this.statsService.create(body);
    return stats;
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateStatDto) {
    const stats = await this.statsService.update(id, body);
    return stats;
  }
}
