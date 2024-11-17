import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { EvaluacionVersionado } from './evaluacion-versionado.entity';
import { EvaluacionVersionadoService } from './evaluacion-versionado.service';

@Controller('/evaluacion-versionado')
export class EvaluacionVersionadoController {
    constructor(private evaluacionVersionadoService: EvaluacionVersionadoService) {}

    @Get()
    getAllEVS() {
        return this.evaluacionVersionadoService.findAll()
    }

    @Get('/:id')
    getEVById(@Param('id') id: number) {
        return this.evaluacionVersionadoService.findById(id);
    }

    @Post()
    createEvaluacionVersionado(@Body() evaluacionVersionadoData: EvaluacionVersionado) {
        return this.evaluacionVersionadoService.create(evaluacionVersionadoData);
    }

    @Delete('/:id')
    deleteAlumno(@Param('id') id: number) {
        return this.evaluacionVersionadoService.delete(id);
    }
    
    @Put('/:id')
    modificarAlumno(@Param('id') id: number, @Body() evaluacionVersionadoData: EvaluacionVersionado) {
        return this.evaluacionVersionadoService.modifyById(id, evaluacionVersionadoData);
    }

}
