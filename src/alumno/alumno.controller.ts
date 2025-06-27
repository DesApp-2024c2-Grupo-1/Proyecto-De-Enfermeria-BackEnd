import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AlumnoService } from './alumno.service';
import { PostAlumnoRequestDTO } from './AlumnoDTO/crearAlumno.dto';

@Controller('/alumno')
export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  @Get()
  getAllAlumnos() {
    return this.alumnoService.findAll();
  }

  @Get('/:id')
  getAlumnoById(@Param('id') id: number) {
    return this.alumnoService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createAlumno(@Body() alumnoData: PostAlumnoRequestDTO): Promise<Alumno> {
    return this.alumnoService.create(alumnoData);
  }

  @Put('/:id')
  modificarAlumno(@Param('id') id: number, @Body() alumnoData: Alumno) {
    return this.alumnoService.modifyById(id, alumnoData);
  }
}
