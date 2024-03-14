import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SunsService } from './suns.service';
import { CreateSunDto } from './dto/create-sun.dto';
import { UpdateSunDto } from './dto/update-sun.dto';

@Controller('suns')
export class SunsController {
  constructor(private readonly sunsService: SunsService) {}

  @Post()
  create(@Body() createSunDto: CreateSunDto) {
    return this.sunsService.create(createSunDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sunsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSunDto: UpdateSunDto) {
    return this.sunsService.update(+id, updateSunDto);
  }
}
