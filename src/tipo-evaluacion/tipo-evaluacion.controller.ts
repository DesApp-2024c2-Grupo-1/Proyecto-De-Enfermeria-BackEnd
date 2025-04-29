import { Body, Controller, Get, Post } from '@nestjs/common';
import { TipoEvaluacionService } from './tipo-evaluacion.service';
import { TipoEvaluacion } from './tipo-evaluacion.entity';

@Controller('/tipo-evaluacion')
export class TipoEvaluacionController {
  constructor(private tipoEvaluacionService: TipoEvaluacionService) {}

  @Post()
  crearTipoEvaluacion(@Body() tipoEvaluacionData: TipoEvaluacion) {
    return this.tipoEvaluacionService.create(tipoEvaluacionData);
  }

  @Get()
  findAll() {
    return this.tipoEvaluacionService.findAll();
  }

  @Get('/:id')
  findById(id: number) {
    return this.tipoEvaluacionService.findById(id);
  }
}
