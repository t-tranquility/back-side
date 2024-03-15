import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankQuestionDto } from './dto/create-bank-question.dto';
import { UpdateBankQuestionDto } from './dto/update-bank-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankQuestion } from './entities/bank-question.entity';
import { Repository } from 'typeorm';
import { UserAnswerDto } from './dto/create-user-answer.dto';

@Injectable()
export class BankQuestionsService {
  constructor(
    @InjectRepository(BankQuestion)
    private bankRepository: Repository<BankQuestion>,
  ) {}

  async create(
    createBankQuestionDto: CreateBankQuestionDto,
  ): Promise<BankQuestion> {
    const { id, content, correctAnswer } = createBankQuestionDto;
    const newQuestion = this.bankRepository.create({
      id,
      content,
      correctAnswer,
    });
    return await this.bankRepository.save(newQuestion);
  }

  async findAll(): Promise<BankQuestion[]> {
    return this.bankRepository.find();
  }

  async findOne(id: number): Promise<BankQuestion | undefined> {
    const foundQuestion = await this.bankRepository.findOne({ where: { id } });
    return foundQuestion;
  }

  async update(id: number, updateBankQuestionDto: UpdateBankQuestionDto) {
    const questionToUpdate = await this.bankRepository.findOneBy({ id });
    if (!questionToUpdate) {
      throw new NotFoundException(`Question #${id} not found`);
    }
    Object.assign(questionToUpdate, updateBankQuestionDto);
    return await this.bankRepository.save(questionToUpdate);
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return this.bankRepository.delete(id);
  }

  async submitAnswers(userAnswers: UserAnswerDto[]): Promise<void> {
    const questions = await this.findAll();
    let score = 0;
    // через фильтр и без переменной снаружм
    userAnswers.forEach((userAnswer) => {
      const question = questions.find((q) => q.id === userAnswer.questionId);

      if (question && question.correctAnswer === userAnswer.selectedAnswer) {
        score++;
      }
      return score;
    });

    console.log(`Score: ${score}/${questions.length}`);
  }
}
