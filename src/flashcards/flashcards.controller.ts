import { Controller, Body, Post, Get, Param, Put } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';

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

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateFlashcardDto) {
    const { correct } = body;
    const flashcard = await this.flashcardsService.update(id, correct);
    return flashcard;
  }
}
