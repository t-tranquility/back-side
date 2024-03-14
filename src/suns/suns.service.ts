import { Injectable } from '@nestjs/common';
import { CreateSunDto } from './dto/create-sun.dto';
import { UpdateSunDto } from './dto/update-sun.dto';

@Injectable()
export class SunsService {
  create(createSunDto: CreateSunDto) {
    return createSunDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} sun`;
  }

  update(id: number, updateSunDto: UpdateSunDto) {
    return updateSunDto;
  }
}
