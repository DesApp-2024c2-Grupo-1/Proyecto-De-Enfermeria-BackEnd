import { Injectable } from '@nestjs/common';
import { Evaluacion } from './evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { Docente } from 'src/docente/docente.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>
  ) {}

    async createEvaluacionYPreguntas(evaluacionyPreguntasData: { titulo: string; exigencia: string; docente:DeepPartial<Docente>; preguntas: { pregunta: string; puntaje: number }[] }) {
      const { titulo, exigencia, docente, preguntas } = evaluacionyPreguntasData

      //evaluacion
      const nuevaEvaluacion = this.evaluacionRepository.create({titulo, exigencia, docente});
      const evaluacionGuardada = await this.evaluacionRepository.save(nuevaEvaluacion);

      //preguntas
      const preguntasGuardadas = await Promise.all(
        preguntas.map(async (preguntaData) => {
          const nuevaPregunta = this.preguntaRepository.create({
            pregunta: preguntaData.pregunta,
            puntaje: preguntaData.puntaje,
            evaluacion: evaluacionGuardada, // Relacionar la pregunta con la evaluación
          });
          return await this.preguntaRepository.save(nuevaPregunta);
        }),
      );
      
        return {
          evaluacion: evaluacionGuardada,
          preguntas: preguntasGuardadas,
        };
    }

    async findAll() {
      const evaluaciones = await this.evaluacionRepository.find({
        select: ['id', 'titulo', 'exigencia'],
    });

        return evaluaciones
    }

    async findById(id: number) {
      const evaluacion = await this.evaluacionRepository.findOne({
        where: { id },
        select: ['id', 'titulo', 'exigencia'],
        relations: ['pregunta']
      });
    
        return evaluacion;
      }

      async create(evaluacionData: Evaluacion) {
        const nuevoEvaluacion = this.evaluacionRepository.create(evaluacionData);
        return await this.evaluacionRepository.save(nuevoEvaluacion);
        }
  
      /*

      async delete(id: number) {
        const salida = await this.evaluacionRepository.delete(id);
      return salida
      }
      
      async modifyById(id: number, evaluacionData: Evaluacion) {
        const evaluacion = await this.evaluacionRepository.findOne({where: {id}})
      Object.assign(evaluacion, evaluacionData)
      this.evaluacionRepository.save(evaluacion)
          
      }

      */
  }

