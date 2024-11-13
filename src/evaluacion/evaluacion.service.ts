import { Injectable } from '@nestjs/common';
import { Evaluacion } from './evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
  ) {}

    async findAll() {
      const evaluaciones = await this.evaluacionRepository.find({
        select: ['id', 'titulo', 'exigencia', 'cantidadDePreguntas', 'puntajeIdeal'],
    });

        return evaluaciones
    }

    async findById(id: number) {
      const evaluacion = await this.evaluacionRepository.findOne({
        where: { id },
        select: ['id', 'titulo', 'exigencia', 'cantidadDePreguntas', 'puntajeIdeal'],
      });
    
        return evaluacion;
      }

      async create(evaluacionData: Evaluacion) {
        const nuevoEvaluacion = this.evaluacionRepository.create(evaluacionData);
        return await this.evaluacionRepository.save(nuevoEvaluacion);
        }
  
      async delete(id: number) {
        const salida = await this.evaluacionRepository.delete(id);
      return salida
      }
      
      async modifyById(id: number, evaluacionData: Evaluacion) {
        const evaluacion = await this.evaluacionRepository.findOne({where: {id}})
      Object.assign(evaluacion, evaluacionData)
      const salida = this.evaluacionRepository.save(evaluacion)
          
      }

  }

