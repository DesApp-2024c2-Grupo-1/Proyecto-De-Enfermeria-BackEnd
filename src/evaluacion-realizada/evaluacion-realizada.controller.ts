import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';

@Controller('/evaluacion-realizada')
export class EvaluacionRealizadaController {
    constructor(private evaluacionRealizadaService: EvaluacionRealizadaService) {}

    @Get()
    getAllEvaluacionesRealizadas() {
        return this.evaluacionRealizadaService.findAll()
    }

    @Get('/:id')
    getEvaluacionRealizadaById(@Param('id') id: number) {
        return this.evaluacionRealizadaService.findById(id);
    }

    @Post()
    createEvaluacionRealizada(@Body() evaluacionRealizadaData: EvaluacionRealizada) {
        return this.evaluacionRealizadaService.create(evaluacionRealizadaData);
    }

    @Delete('/:id')
    deleteEvaluacionRealizada(@Param('id') id: number) {
        return this.evaluacionRealizadaService.delete(id);
    }

    @Put('/:id')
    modificarAlumno(@Param('id') id: number, @Body() alumnoData: EvaluacionRealizada) {
        return this.evaluacionRealizadaService.modifyById(id, alumnoData);
    }
}
