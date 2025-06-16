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
import { Evaluacion } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';
import { PostEvaluacionRequestDTO } from './EvaluacionDTO/crearEvaluacion.dto';
import { PutEvaluacionRequestDTO } from './EvaluacionDTO/updateEvaluacion.dto';

@Controller('/evaluacion')
export class EvaluacionController {
  constructor(private evaluacionService: EvaluacionService) {}

  @Get()
  getAllEvaluaciones() {
    return this.evaluacionService.findAll();
  }

  @Get('/:id')
  getEvaluacionById(@Param('id') id: number) {
    return this.evaluacionService.findById(id);
  }

  @Get()
  getEvaluacionPorTitulo(@Param('titulo') titulo: string) {
    return this.evaluacionService.findByTitulo(titulo);
  }

  @Get('/versiones/:id')
  getAllVersionesDeEvaluacionPorId(@Param('id') id: number) {
    return this.evaluacionService.findAllVersionesDeEvaluacionById(id);
  }

  @Put('/:id')
  deshabilitarEvaluacion(@Param('id') id: number) {
    return this.evaluacionService.deshabilitarEvaluacion(id);
  }

  @Put('/modificar-evaluacion/:id')
  modificarEvaluacion(
    @Body() data: PutEvaluacionRequestDTO,
    @Param('id') id: number,
  ) {
    return this.evaluacionService.modificarEvaluacion(data, id);
  }

  /*
    @Post()
    createEvaluacion(@Body() evaluacionData: Evaluacion) {
        return this.evaluacionService.create(evaluacionData);
    }
    */

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crearEvaluacion(@Body() data: PostEvaluacionRequestDTO) {
    return this.evaluacionService.createEvaluacionYPreguntas(data);
  }

  /*
    @Delete('/:id')
    deleteEvaluacion(@Param('id') id: number) {
        return this.evaluacionService.delete(id);
    }

    @Put('/:id')
    modificarAlumno(@Param('id') id: number, @Body() evaluacionData: Evaluacion) {
        return this.evaluacionService.modifyById(id, evaluacionData);
    }
*/
}
