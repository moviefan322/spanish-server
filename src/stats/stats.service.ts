import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stat } from './stat.entity';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stat)
    private repo: Repository<Stat>,
  ) {}

  async getStats() {
    return this.repo.find();
  }

  async create(statDto: CreateStatDto, user: User) {
    const stat = this.repo.create({ ...statDto, user });
    return this.repo.save(stat);
  }

  async update(id: number, statDto: UpdateStatDto) {
    const stat = await this.repo.findOne({ where: { id } });
    if (!stat) {
      return null;
    }
    this.repo.merge(stat, statDto);
    return this.repo.save(stat);
  }
}
