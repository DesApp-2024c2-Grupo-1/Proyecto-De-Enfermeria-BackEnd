import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { Evaluacion } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';

@Controller('/evaluacion')
export class EvaluacionController {
    constructor(private evaluacionService: EvaluacionService) {}

    @Get()
    getAllEvaluaciones() {
        return this.evaluacionService.findAll()
    }

    @Get('/:id')
    getEvaluacionById(@Param('id') id: number) {
        return this.evaluacionService.findById(id);
    }

    @Post()
    createEvaluacion(@Body() evaluacionData: Evaluacion) {
        return this.evaluacionService.create(evaluacionData);
    }

    @Delete('/:id')
    deleteEvaluacion(@Param('id') id: number) {
        return this.evaluacionService.delete(id);
    }

    @Put('/:id')
    modificarAlumno(@Param('id') id: number, @Body() evaluacionData: Evaluacion) {
        return this.evaluacionService.modifyById(id, evaluacionData);
    }
}
