import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('stats')
@UseGuards(AuthGuard())
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
