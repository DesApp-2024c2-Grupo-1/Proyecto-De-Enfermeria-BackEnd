import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Injectable()
export class PreguntaService {
    constructor(
        @InjectRepository(Pregunta)
        private readonly preguntaRepository: Repository<Pregunta>,
    ){}


    async findAll() {
        const preguntas = await this.preguntaRepository.find({
         select: ['id', 'pregunta', 'puntaje'],
        });
        return preguntas
    }

    async findById(id: number) {
        const pregunta = await this.preguntaRepository.findOne({
          where: { id },
          select: ['id', 'pregunta', 'puntaje'],
        });
        return pregunta;
    }

    async create(preguntaData: Pregunta) {
        const nuevaPregunta = this.preguntaRepository.create(preguntaData);
        return await this.preguntaRepository.save(nuevaPregunta);
    }
    
    async delete(id: number) {
        await this.preguntaRepository.delete(id);
        
    }

    async modifyById(id: number, preguntaData: Pregunta) {
        const pregunta = await this.preguntaRepository.findOne({ where: { id } });
        Object.assign(pregunta, preguntaData);
        this.preguntaRepository.save(pregunta);
    }


}
