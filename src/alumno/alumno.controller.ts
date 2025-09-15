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
  UseGuards,
} from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AlumnoService } from './alumno.service';
import { PostAlumnoRequestDTO } from './AlumnoDTO/crearAlumno.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { Rol } from 'src/auth/auth.roles.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/auth.roles.decorator';

@Controller('/alumno')
export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener todos los alumnos (requiere JWT)'})
  getAllAlumnos() {
    return this.alumnoService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener alumno por ID (requiere JWT)'})
  getAlumnoById(@Param('id') id: number) {
    return this.alumnoService.findById(id);
  }

  @Post()
  @ApiOperation({summary: 'Crear alumno'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createAlumno(@Body() alumnoData: PostAlumnoRequestDTO): Promise<Alumno> {
    return this.alumnoService.create(alumnoData);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Modificar alumno por ID (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  modificarAlumno(@Param('id') id: number, @Body() alumnoData: Alumno) {
    return this.alumnoService.modifyById(id, alumnoData);
  }
}
