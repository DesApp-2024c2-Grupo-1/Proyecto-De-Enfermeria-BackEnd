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
} from '@nestjs/common';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';
import { PostEvaluacionRealizadaDTO } from './EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';

@Controller('/evaluacion-realizada')
export class EvaluacionRealizadaController {
  constructor(private evaluacionRealizadaService: EvaluacionRealizadaService) {}

  @Get('/:id')
  getEvaluacionRealizadaById(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crearEvaluacionRealizada(@Body() data: PostEvaluacionRealizadaDTO) {
    return this.evaluacionRealizadaService.crearEvaluacionRealizada(data);
  }

  @Get('evaluaciones-alumno/:idEvaluacion/:idAlumno')
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
  findAllAlumnosPorEvaluacion(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllAlumnosPorEvaluacion(id);
  }

  @Get('evaluaciones-realizadas-por-alumno/:id')
  findAllEvaluacionesPorAlumno(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllEvaluacionesPorAlumno(id);
  }

  //Para el dropdown
  @Get('evaluaciones-realizadas-alumno/:id')
  findEvaluacionesDeUnAlumno(@Param('id') alumnoId: number) {
    return this.evaluacionRealizadaService.findEvaluacionesDeUnAlumno(alumnoId);
  }
}
