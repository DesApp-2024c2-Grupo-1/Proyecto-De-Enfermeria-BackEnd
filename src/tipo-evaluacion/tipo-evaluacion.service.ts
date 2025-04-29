import { Injectable } from '@nestjs/common';
import { TipoEvaluacion } from './tipo-evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipoEvaluacionService {
  constructor(
    @InjectRepository(TipoEvaluacion)
    private readonly tipoEvaluacionRepository: Repository<TipoEvaluacion>,
  ) {}

  async create(tipoEvaluacionData) {
    const tipoEvaluacion =
      await this.tipoEvaluacionRepository.create(tipoEvaluacionData);
    return await this.tipoEvaluacionRepository.save(tipoEvaluacion);
  }

  async findAll() {
    const tipos = await this.tipoEvaluacionRepository.find({
      select: ['id'],
    });

    return tipos;
  }

  async findById(id: number) {
    const tipo = await this.tipoEvaluacionRepository.findOne({
      where: { id },
      select: ['id'],
    });
    return tipo;
  }
}
