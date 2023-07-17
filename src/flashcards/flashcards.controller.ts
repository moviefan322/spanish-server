import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/user.entity';
import { Flashcard } from './flashcard.entity';

@Controller('flashcards')
@UseGuards(AuthGuard())
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get()
  async getFlashcards(): Promise<Flashcard[]> {
    return this.flashcardsService.getFlashcards();
  }

  @Post()
  async create(
    @Body() CreateFlashcardDto: CreateFlashcardDto,
    @GetUser() user: User,
  ) {
    const flashcard = await this.flashcardsService.create(
      CreateFlashcardDto,
      user,
    );
    return flashcard;
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ) {
    const flashcard = await this.flashcardsService.update(
      id,
      updateFlashcardDto,
    );
    return flashcard;
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const flashcard = await this.flashcardsService.delete(id);
    return { Deleted: flashcard };
  }
}
