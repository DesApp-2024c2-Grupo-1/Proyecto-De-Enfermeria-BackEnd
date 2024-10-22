import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../db/data-source';
import { Docente } from './docente.entity';

@Injectable()
export class DocenteService {

    async findAll() {
        const docentes = await AppDataSource
            .getRepository(Docente)
            .createQueryBuilder("user")
            .getMany()

        return docentes
    }

    async findById(id: number) {
        const docente = await AppDataSource
          .getRepository(Docente)
          .createQueryBuilder('docente')
          .where('docente.id = :id', { id })
          .getOne();
    
        return docente;
      }
}
