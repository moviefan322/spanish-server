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
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/user.entity';

@Controller('stats')
@UseGuards(AuthGuard())
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats() {
    return this.statsService.getStats();
  }

  @Post()
  async create(@Body() createStatDto: CreateStatDto, @GetUser() user: User) {
    const stats = await this.statsService.create(createStatDto, user);
    return stats;
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateStatDto) {
    const stats = await this.statsService.update(id, body);
    return stats;
  }
}
