
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
}
