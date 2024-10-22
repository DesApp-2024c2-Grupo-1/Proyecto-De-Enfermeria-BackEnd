import { Controller, Get } from '@nestjs/common';
import { AlumnoService } from './alumno.service'

@Controller('/alumno')
export class AlumnoController {
    constructor(private alumnoService: AlumnoService) {}

    @Get()
    getAllAlumnos() {
        return this.alumnoService.findAll()
    }

    getAlumnoById(id: number) {
        return this.alumnoService.findById(id);
    }

      async create(alumnoData: Partial<Alumno>): Promise<Alumno> {
    const nuevoAlumno = this.alumnoRepository.create(alumnoData); // Crear instancia
    return this.alumnoRepository.save(nuevoAlumno); // Guardar en la base de datos
  }
}
