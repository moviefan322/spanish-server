import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, correct: boolean) {
    const flashcard: Flashcard = await this.repo.findOne({ where: { id } });

    if (!flashcard) {
      throw new NotFoundException('Flashcard not found');
    }

    if (correct) {
      flashcard.correctGuess += 1;
      flashcard.last5.unshift('correct');
    } else {
      flashcard.falseGuess += 1;
      flashcard.last5.unshift('incorrect');
    }

    if (flashcard.last5.length > 5) {
      flashcard.last5.pop();
    }

    let correctWeighted = flashcard.correctGuess;
    let falseWeighted = flashcard.falseGuess;
    if (flashcard.last5.length > 0) {
      flashcard.last5.forEach((guess) => {
        if (guess === 'correct') {
          correctWeighted += 2;
        } else {
          falseWeighted += 2;
        }
      });
    }

    if (correctWeighted > falseWeighted && flashcard.correctGuess > 5) {
      flashcard.priority = false;
    } else {
      flashcard.priority = true;
    }

    return this.repo.save(flashcard);
  }
}
