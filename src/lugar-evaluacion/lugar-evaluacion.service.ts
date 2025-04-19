import { BadRequestException, Injectable } from '@nestjs/common';
import { LugarEvaluacion } from './lugar-evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LugarEvaluacionService {
  constructor(
    @InjectRepository(LugarEvaluacion)
    private readonly lugarEvaluacionRepository: Repository<LugarEvaluacion>,
  ) {}

  async findAll() {
    const lugares = await this.lugarEvaluacionRepository.find({
      select: ['id', 'nombre'],
    });

    return lugares;
  }

  async findById(id: number) {
    const lugar = await this.lugarEvaluacionRepository.findOne({
      where: { id },
      select: ['id', 'nombre'],
    });
    return lugar;
  }

}
