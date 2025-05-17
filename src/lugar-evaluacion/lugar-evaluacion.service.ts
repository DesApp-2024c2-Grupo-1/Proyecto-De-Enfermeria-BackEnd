import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LugarEvaluacion } from 'src/lugar-evaluacion/lugar-evaluacion.entity';

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

  async create(LugarEvaluacionData: LugarEvaluacion) {
      const nuevoLugar = this.lugarEvaluacionRepository.create(LugarEvaluacionData);
      return await this.lugarEvaluacionRepository.save(nuevoLugar);
    }

}
