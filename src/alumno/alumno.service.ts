import { Injectable } from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AppDataSource } from '../db/data-source';

@Injectable()
export class AlumnoService {
    async findAll() {
      const alumnos = await AppDataSource.getRepository(Alumno).find({
        select: ['id', 'nombre', 'apellido', 'email', 'dni'],
    });

    return alumnos;
    }

    async findById(id: number) {
      const alumno = await AppDataSource.getRepository(Alumno).findOne({
        where: { id },
        select: ['id', 'nombre', 'apellido', 'email', 'dni'],
      });
      return alumno;
    }

    async findByDni(dni: number) {
      const alumno = await AppDataSource.getRepository(Alumno).findOne({
        where: { dni },
        select: ['id', 'nombre', 'apellido', 'email', 'dni'],
      });
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
