import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';
import { PostEvaluacionRealizadaDTO } from './EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { Rol } from 'src/auth/auth.roles.enum';
import { Roles } from 'src/auth/auth.roles.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('/evaluacion-realizada')
export class EvaluacionRealizadaController {
  constructor(private evaluacionRealizadaService: EvaluacionRealizadaService) {}

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consulta evaluacion realizada por ID (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getEvaluacionRealizadaById(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Registrar evaluacion (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crearEvaluacionRealizada(@Body() data: PostEvaluacionRealizadaDTO) {
    return this.evaluacionRealizadaService.crearEvaluacionRealizada(data);
  }

  @Get('evaluaciones-alumno/:idEvaluacion/:idAlumno')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar evaluaciones de un alumno (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findAllEvaluacionesDeUnAlumno(
    @Param('idEvaluacion') idEvaluacion: number,
    @Param('idAlumno') idAlumno: number,
  ) {
    return this.evaluacionRealizadaService.findAllEvaluacionesDeUnAlumno(
      idEvaluacion,
      idAlumno,
    );
  }

  @Get('evaluaciones-realizadas/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar todos los alumnos que realizaron una evaluacion (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findAllAlumnosPorEvaluacion(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllAlumnosPorEvaluacion(id);
  }

  @Get('evaluaciones-realizadas-por-alumno/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar todas las evaluaciones realizadas por un alummno (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findAllEvaluacionesPorAlumno(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllEvaluacionesPorAlumno(id);
  }

  //Para el dropdown
  @Get('evaluaciones-realizadas-alumno/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar evaluaciones realizadas por un alumno de un modelo (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findEvaluacionesDeUnAlumno(@Param('id') alumnoId: number) {
    return this.evaluacionRealizadaService.findEvaluacionesDeUnAlumno(alumnoId);
  }
}
