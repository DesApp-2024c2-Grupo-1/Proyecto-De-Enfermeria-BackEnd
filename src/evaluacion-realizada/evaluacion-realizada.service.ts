import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { PreguntaRespondida } from 'src/pregunta-respondida/pregunta-respondida.entity';


@Injectable()
export class EvaluacionRealizadaService {
  constructor(
    @InjectRepository(EvaluacionRealizada)
    private readonly evaluacionRealizadaRepository: Repository<EvaluacionRealizada>,
    @InjectRepository(PreguntaRespondida)
    private readonly preguntaRespondidaRepository: Repository<PreguntaRespondida>,
  ) {}

  async findAll() {
    const evaluacionesRealizadas =
      await this.evaluacionRealizadaRepository.find({
        select: ['id', 'fecha'],
        relations: ['alumno', 'docente', 'evaluacion', 'preguntaRespondida'],
      });

    return evaluacionesRealizadas;
  }

  async findById(id: number) {
    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({
        where: { id },
        select: ['id', 'fecha'],
      });

    return evaluacionRealizada;
  }

  async create(evaluacionRealizadaData: EvaluacionRealizada) {
    const nuevoEvaluacionRealizada = this.evaluacionRealizadaRepository.create(
      evaluacionRealizadaData,
    );
    return await this.evaluacionRealizadaRepository.save(
      nuevoEvaluacionRealizada,
    );
  }

  async delete(id: number) {
    const salida = await this.evaluacionRealizadaRepository.delete(id);

    return salida;
  }

  async modifyById(id: number, evaluacionRealizadaData: EvaluacionRealizada) {
    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({ where: { id } });
    Object.assign(evaluacionRealizada, evaluacionRealizadaData);
    this.evaluacionRealizadaRepository.save(evaluacionRealizada);
  }
}
