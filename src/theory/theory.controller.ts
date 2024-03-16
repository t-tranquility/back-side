import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TheoryService } from './theory.service';
import { CreateTheoryDto } from './dto/create-theory.dto';
import { UpdateTheoryDto } from './dto/update-theory.dto';

@Controller('theory')
export class TheoryController {
  constructor(private readonly theoryService: TheoryService) {}

  @Post()
  create(@Body() createTheoryDto: CreateTheoryDto) {
    return this.theoryService.create(createTheoryDto);
  }

  @Get()
  findAll() {
    return this.theoryService.findAll();
  }

  @Get(':page')
  findOne(@Param('page') page: string) {
    return this.theoryService.findOne(page);
  }

  @Patch(':page')
  update(
    @Param('page') page: string,
    @Body() updateTheoryDto: UpdateTheoryDto,
  ) {
    return this.theoryService.update(page, updateTheoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theoryService.remove(+id);
  }
}
