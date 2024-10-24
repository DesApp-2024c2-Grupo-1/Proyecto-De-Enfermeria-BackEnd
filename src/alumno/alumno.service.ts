import { Injectable } from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AppDataSource } from '../db/data-source';

@Injectable()
export class AlumnoService {

    async findAll() {
        const alumnos = await AppDataSource
            .getRepository(Alumno)
            .createQueryBuilder('alumno')
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

    async create(alumnoData: Alumno) {
      const nuevoAlumno = await AppDataSource
          .getRepository(Alumno)
          .create(alumnoData)

          return AppDataSource
          .getRepository(Alumno)
          .save(nuevoAlumno)
      }

    async delete(id: number) {
      const salida = await AppDataSource
        .getRepository(Alumno)
        .createQueryBuilder()
        .delete()
        .from(Alumno)
        .where('id = :id', { id })
        .execute()

        return salida
    }

    async modifyById(id: number, alumnoData: Alumno) {
      const alumno = await AppDataSource
        .getRepository(Alumno)
        .findOneBy({id})


        Object.assign(alumno, alumnoData)

      const salida = AppDataSource
        .getRepository(Alumno)
        .save(alumno)


      return salida
        
    }
}
