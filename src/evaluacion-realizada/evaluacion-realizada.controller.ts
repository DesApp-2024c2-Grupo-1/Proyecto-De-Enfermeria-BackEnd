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

  @Get()
  getAllEvaluacionesRealizadas() {
    return this.evaluacionRealizadaService.findAll();
  }

  @Get('/:id')
  getEvaluacionRealizadaById(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crearEvaluacionRealizada(@Body() data: PostEvaluacionRealizadaDTO) {
    return this.evaluacionRealizadaService.crearEvaluacionRealizada(data);
  }

  @Get()
  getAllEvaluacionesPorTitulo(@Param('titulo') titulo: string) {
    return this.evaluacionRealizadaService.findAllEvaluacionesPorTitulo(titulo);
  }

  @Get('evaluciones-alumno/:id')
  findAllEvaluacionesDeUnAlumno(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllEvaluacionesDeUnAlumno(id);
  }

  @Get()
  findAllEvaluacionesPorAlumnoYTitulo(
    @Param('id') @Param('titulo') id: number,
    titulo: string,
  ) {
    return this.evaluacionRealizadaService.findAllEvaluacionesPorAlumnoYTitulo(
      id,
      titulo,
    );
  }
  /*@Get('/:titulo')
  findAllAlumnosPorEvaluacion(
    @Param('titulo') titulo: string,
  ) {
    return this.evaluacionRealizadaService.findAllAlumnosPorTituloDeEvaluacion(
      titulo,
    );
  }
*/

  @Get('evaluaciones-realizadas/:id')
  findAllAlumnosPorEvaluacion(
    @Param('id') id: number,
  ) {
    return this.evaluacionRealizadaService.findAllAlumnosPorEvaluacion(
      id,
    );
  }

  /*
    @Delete('/:id')
    deleteEvaluacionRealizada(@Param('id') id: number) {
        return this.evaluacionRealizadaService.delete(id);
    }

    @Put('/:id')
    modificarAlumno(@Param('id') id: number, @Body() alumnoData: EvaluacionRealizada) {
        return this.evaluacionRealizadaService.modifyById(id, alumnoData);
    }
        */
}
