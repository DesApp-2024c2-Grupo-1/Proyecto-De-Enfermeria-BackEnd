import { Controller, Get } from '@nestjs/common';
import { AlumnoService } from './alumno.service'

@Controller('/alumno')
export class AlumnoController {
    constructor(private alumnoService: AlumnoService) {}

    @Get()
    getAllAlumnos() {
        return this.alumnoService.findAll()
    }
}
