import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flashcard } from './flashcard.entity';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(Flashcard)
    private repo: Repository<Flashcard>,
  ) {}

  async create(flashcardDto: CreateFlashcardDto) {
    const flashcard = this.repo.create(flashcardDto);
    return this.repo.save(flashcard);
  }

  async getFlashcards() {
    return this.repo.find();
  }
}
