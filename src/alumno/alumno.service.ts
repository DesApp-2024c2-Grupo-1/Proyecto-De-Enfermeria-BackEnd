import { Injectable } from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostAlumnoRequestDTO } from './AlumnoDTO/crearAlumno.dto';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>,
  ) {}

  async findAll() {
    const alumnos = await this.alumnoRepository.find({
      select: ['id', 'nombre', 'apellido', 'dni'],
    });

    return alumnos;
  }

  async findById(id: number) {
    const alumno = await this.alumnoRepository.findOne({
      where: { id },
      select: ['id', 'nombre', 'apellido', 'dni'],
    });
    return alumno;
  }

  // aca no estamos usando el dto
  async create(alumnoData: PostAlumnoRequestDTO) {
    const nuevoAlumno = this.alumnoRepository.create(alumnoData);
    return await this.alumnoRepository.save(nuevoAlumno);
  }

  // este no lo usamos actualmente, pero dejamos la base a futuro
  async modifyById(id: number, alumnoData: Alumno) {
    const alumno = await this.alumnoRepository.findOne({ where: { id } });
    Object.assign(alumno, alumnoData);
    this.alumnoRepository.save(alumno);
  }
}
