import { Injectable } from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AppDataSource } from '../db/data-source';

@Injectable()
export class AlumnoService {

    async findAll() {
        const alumnos = await AppDataSource
            .getRepository(Alumno)
            .createQueryBuilder("user")
            .getMany()

        return alumnos
    }

    async findById(id: number) {
        const alumno = await AppDataSource
          .getRepository(Alumno)
          .createQueryBuilder('alumno')
          .where('alumno.id = :id', { id })
          .getOne();
    
        return alumno;
      }
}
