import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PreguntaRespondida } from './pregunta-respondida.entity';
import { Pregunta } from 'src/pregunta/pregunta.entity';

@Injectable()
export class PreguntaRespondidaService {
  constructor(
    @InjectRepository(PreguntaRespondida)
    private readonly preguntaRespondidaRepository: Repository<PreguntaRespondida>,
  ) {}

  async create(preguntaRespondidaData: {
    respuesta: boolean;
    pregunta: DeepPartial<Pregunta>;
  }) {
    const { respuesta, pregunta } = preguntaRespondidaData;
    const nuevaPreguntaRespondida = this.preguntaRespondidaRepository.create({
      respuesta,
      pregunta,
    });
    await this.preguntaRespondidaRepository.save(nuevaPreguntaRespondida);
  }

  async findAll() {
    const preguntasRespondidas = await this.preguntaRespondidaRepository.find({
      select: ['id', 'respuesta'],
      //relations: []
    });
    return preguntasRespondidas;
  }
}
