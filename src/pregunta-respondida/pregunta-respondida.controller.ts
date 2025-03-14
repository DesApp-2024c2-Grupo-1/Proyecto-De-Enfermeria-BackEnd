import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PreguntaRespondida } from './pregunta-respondida.entity';
import { PreguntaRespondidaService } from './pregunta-respondida.service';

@Controller('/pregunta-respondida')
export class PreguntaRespondidaController {
    constructor(private readonly PreguntaRespondidaService: PreguntaRespondidaService) {}
    
        @Get()
        getAllPreguntas() {
            return this.PreguntaRespondidaService.findAll()
        }
    
        @Get('/:id')
        getPreguntasById(@Param('id') id: number) {
            return this.PreguntaRespondidaService.findById(id);
        }
    
        @Post()
        createPreguntas(@Body() preguntaRespondidaData: PreguntaRespondida) {
            return this.PreguntaRespondidaService.create(preguntaRespondidaData);
        }
            
}
