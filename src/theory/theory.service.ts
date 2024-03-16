import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTheoryDto } from './dto/create-theory.dto';
import { UpdateTheoryDto } from './dto/update-theory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theory } from './entities/theory.entity';

@Injectable()
export class TheoryService {
  constructor(
    @InjectRepository(Theory)
    private theoryRepository: Repository<Theory>,
  ) {}

  async create(createTheoryDto: CreateTheoryDto): Promise<Theory> {
    const { id, page, theory } = createTheoryDto;
    const newTheory = this.theoryRepository.create({ id, page, theory });
    return await this.theoryRepository.save(newTheory);
  }

  async findAll(): Promise<Theory[]> {
    return this.theoryRepository.find();
  }

  async findOne(page: string): Promise<Theory | undefined> {
    const foundTheory = await this.theoryRepository.findOne({
      where: { page },
    });
    return foundTheory;
  }

  async update(page: string, updateTheoryDto: UpdateTheoryDto) {
    const theoryToUpdate = await this.theoryRepository.findOneBy({ page });
    if (!theoryToUpdate) {
      throw new NotFoundException(`theoty about ${page} not found`);
    }
    Object.assign(theoryToUpdate, updateTheoryDto);
    return await this.theoryRepository.save(theoryToUpdate);
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return this.theoryRepository.delete(id);
  }
}
