import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PreguntaRespondida } from './pregunta-respondida.entity';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';

@Injectable()
export class PreguntaRespondidaService {
  constructor(
    @InjectRepository(PreguntaRespondida)
    private readonly preguntaRespondidaRepository: Repository<PreguntaRespondida>,
  ) {}

  async findAll() {
    const preguntasRespondidas = await this.preguntaRespondidaRepository.find({
      select: ['id', 'respuesta'],
      //relations: []
    });
    return preguntasRespondidas;
  }

  async findById(id: number) {
    const preguntaRespondida = await this.preguntaRespondidaRepository.findOne({
      where: { id },
      select: ['id', 'respuesta'],
    });
    return preguntaRespondida;
  }

  async create(preguntaRespondidaData: {
    respuesta: boolean;
    evaluacionRealizada: DeepPartial<EvaluacionRealizada>;
    pregunta: DeepPartial<Pregunta>;
  }) {
    const { respuesta, pregunta, evaluacionRealizada } = preguntaRespondidaData;
    const nuevaPreguntaRespondida = this.preguntaRespondidaRepository.create({
      respuesta,
      pregunta,
      evaluacionRealizada,
    });
    await this.preguntaRespondidaRepository.save(nuevaPreguntaRespondida);
  }
}
