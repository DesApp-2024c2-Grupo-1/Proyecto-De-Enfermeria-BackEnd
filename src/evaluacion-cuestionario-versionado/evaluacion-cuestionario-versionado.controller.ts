import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { EvaluacionCuestionarioVersionado } from './evaluacion-cuestionario-versionado.entity';
import { EvaluacionCuestionarioVersionadoService } from './evaluacion-cuestionario-versionado.service';

@Controller('evaluacion-cuestionario-versionado')
export class EvaluacionCuestionarioVersionadoController {
    constructor(private evaluacionCuestionarioVersionadoService: EvaluacionCuestionarioVersionadoService) {}

    @Get()
    getAllECVS() {
        return this.evaluacionCuestionarioVersionadoService.findAll()
    }

    @Get()
    getECVById(id: number) {
        return this.evaluacionCuestionarioVersionadoService.findById(id);
    }

    @Post()
    createEvaluacionCuestionarioVersionado(@Body() evaluacionCuestionarioVersionadoData: EvaluacionCuestionarioVersionado) {
        return this.evaluacionCuestionarioVersionadoService.create(evaluacionCuestionarioVersionadoData);
    }

    @Delete(':id')
    deleteAlumno(@Param('id') id: number) {
        return this.evaluacionCuestionarioVersionadoService.delete(id);
    } 


}
