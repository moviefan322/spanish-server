import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get()
  async getFlashcards() {
    return this.flashcardsService.getFlashcards();
  }

  @Post()
  async create(@Body() body: CreateFlashcardDto) {
    const flashcard = await this.flashcardsService.create(body);
    return flashcard;
  }
}
