import { Injectable } from '@nestjs/common';
import { Cuestionario } from './cuestionario.entity';
import { AppDataSource } from '../db/data-source';

@Injectable()
export class CuestionarioService {

    async findAll() {
        const cuestionarios = await AppDataSource
            .getRepository(Cuestionario)
            .createQueryBuilder("user")
            .getMany()

        return cuestionarios
    }

    async findById(id: number) {
        const cuestionario = await AppDataSource
          .getRepository(Cuestionario)
          .createQueryBuilder('cuestionario')
          .where('cuestionario.id = :id', { id })
          .getOne();
    
        return cuestionario;
      }
}
