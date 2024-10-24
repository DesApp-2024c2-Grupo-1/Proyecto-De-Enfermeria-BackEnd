import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AlumnoService } from './alumno.service'

@Controller('/alumno')
export class AlumnoController {
    constructor(private alumnoService: AlumnoService) {}

    @Get()
    getAllAlumnos() {
        return this.alumnoService.findAll()
    }

    @Get('/:id')
    getAlumnoById(@Param('id') id: number) {
        return this.alumnoService.findById(id);
    }

    @Post()
    createAlumno(@Body() alumnoData: Alumno) {
        return this.alumnoService.create(alumnoData);
    }

    @Delete(':id')
    deleteAlumno(@Param('id') id: number) {
        return this.alumnoService.delete(id);
    }

    @Put('/:id')
    modificarAlumno(@Param('id') id: number, @Body() alumnoData: Alumno) {
        return this.alumnoService.modifyById(id, alumnoData);
    }

}
