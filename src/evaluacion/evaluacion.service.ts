
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../db/data-source';
import { Evaluacion } from './evaluacion.entity';

@Injectable()
export class EvaluacionService {

    async findAll() {
        const evaluaciones = await AppDataSource
            .getRepository(Evaluacion)
            .createQueryBuilder("user")
            .getMany()

        return evaluaciones
    }

    async findById(id: number) {
        const evaluacion = await AppDataSource
          .getRepository(Evaluacion)
          .createQueryBuilder('evaluacion')
          .where('evaluacion.id = :id', { id })
          .getOne();
    
        return evaluacion;
      }

      async create(evaluacionData: Evaluacion) {
        const nuevoEvaluacion = await AppDataSource
            .getRepository(Evaluacion)
            .create(evaluacionData)
  
            return AppDataSource
            .getRepository(Evaluacion)
            .save(nuevoEvaluacion)
        }
  
      async delete(id: number) {
        const salida = await AppDataSource
          .getRepository(Evaluacion)
          .createQueryBuilder()
          .delete()
          .from(Evaluacion)
          .where('id = :id', { id })
          .execute()
  
          return salida
      }
      
      async modifyById(id: number, evaluacionData: Evaluacion) {
        const evaluacion = await AppDataSource
          .getRepository(Evaluacion)
          .findOneBy({id})
  
  
          Object.assign(evaluacion, evaluacionData)
  
        const salida = AppDataSource
          .getRepository(Evaluacion)
          .save(evaluacion)
  
  
        return salida
          
      }

  }

