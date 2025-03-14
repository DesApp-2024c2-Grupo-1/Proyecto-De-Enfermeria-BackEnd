import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Pregunta } from './pregunta.entity';
import { PreguntaService } from './pregunta.service';

@Controller('/pregunta')
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntaService) {}

  @Get()
  getAllPreguntas() {
    return this.preguntaService.findAll();
  }

  @Get('/:id')
  getPreguntasById(@Param('id') id: number) {
    return this.preguntaService.findById(id);
  }

  /*
    @Post()
    createPreguntas(@Body() preguntaData: Pregunta) {
        return this.preguntaService.create(preguntaData);
    }*/

  @Delete('/:id')
  deletePregunta(@Param('id') id: number) {
    return this.preguntaService.delete(id);
  }

  @Put('/:id')
  modificarPregunta(@Param('id') id: number, @Body() preguntaData: Pregunta) {
    return this.preguntaService.modifyById(id, preguntaData);
  }
}
