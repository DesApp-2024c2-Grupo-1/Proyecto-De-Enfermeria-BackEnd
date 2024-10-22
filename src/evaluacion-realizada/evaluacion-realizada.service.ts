import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../db/data-source';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';

@Injectable()
export class EvaluacionRealizadaService {

    async findAll() {
        const evaluacionesrealizadas = await AppDataSource
            .getRepository(EvaluacionRealizada)
            .createQueryBuilder("user")
            .getMany()

        return evaluacionesrealizadas
    }

    async findById(id: number) {
        const evaluacionRealizada = await AppDataSource
          .getRepository(EvaluacionRealizada)
          .createQueryBuilder('evaluacion')
          .where('evaluacion.id = :id', { id })
          .getOne();
    
        return evaluacionRealizada;
      }

      async create(evaluacionRealizadaData: EvaluacionRealizada) {
        const nuevoEvaluacionRealizada = await AppDataSource
            .getRepository(EvaluacionRealizada)
            .create(evaluacionRealizadaData)
  
            return AppDataSource
            .getRepository(EvaluacionRealizada)
            .save(nuevoEvaluacionRealizada)
        }
  
      async delete(id: number) {
        const salida = await AppDataSource
          .getRepository(EvaluacionRealizada)
          .createQueryBuilder()
          .delete()
          .from(EvaluacionRealizada)
          .where('id = :id', { id })
          .execute()
  
          return salida
      }
}
