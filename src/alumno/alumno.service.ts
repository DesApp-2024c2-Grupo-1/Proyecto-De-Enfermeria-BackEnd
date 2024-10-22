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
}
