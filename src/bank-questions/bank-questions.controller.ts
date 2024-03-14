import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankQuestionsService } from './bank-questions.service';
import { CreateBankQuestionDto } from './dto/create-bank-question.dto';
import { UpdateBankQuestionDto } from './dto/update-bank-question.dto';
import { UserAnswerDto } from './dto/create-user-answer.dto';

@Controller('bank-questions')
export class BankQuestionsController {
  constructor(private readonly bankQuestionsService: BankQuestionsService) {}

  @Post()
  create(@Body() createBankQuestionDto: CreateBankQuestionDto) {
    return this.bankQuestionsService.create(createBankQuestionDto);
  }

  @Post('submit-answers')
  async submitAnswers(@Body() userAnswers: UserAnswerDto[]) {
    return this.bankQuestionsService.submitAnswers(userAnswers);
  }

  @Get()
  findAll() {
    return this.bankQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankQuestionDto: UpdateBankQuestionDto,
  ) {
    return this.bankQuestionsService.update(+id, updateBankQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankQuestionsService.remove(+id);
  }
}
