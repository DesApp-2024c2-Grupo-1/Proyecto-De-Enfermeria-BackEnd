import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
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

    @Post()
    createAlumno(alumnoData: Alumno) {
        return this.alumnoService.create(alumnoData);
    }

    @Delete(':id')
    deleteAlumno(id: number) {
        return this.alumnoService.delete(id);
    }

}
