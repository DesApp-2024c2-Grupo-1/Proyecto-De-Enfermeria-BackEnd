import {
  Controller,
  Get,
  Post,
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

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crearEvaluacion(@Body() data: PostEvaluacionRequestDTO) {
    return this.evaluacionService.createEvaluacionYPreguntas(data);
  }
}
