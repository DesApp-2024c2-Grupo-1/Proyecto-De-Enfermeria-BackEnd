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
        const evaluacionrealizada = await AppDataSource
          .getRepository(EvaluacionRealizada)
          .createQueryBuilder('evaluacion')
          .where('evaluacion.id = :id', { id })
          .getOne();
    
        return evaluacionrealizada;
      }
}
