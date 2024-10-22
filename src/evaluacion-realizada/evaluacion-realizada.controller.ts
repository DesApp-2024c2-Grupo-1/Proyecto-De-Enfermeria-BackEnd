import { Controller, Get } from '@nestjs/common';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';

@Controller('evaluacion-realizada')
export class EvaluacionRealizadaController {
    constructor(private evaluacionRealizadaService: EvaluacionRealizadaService) {}

    @Get()
    getAllEvaluacionesRealizadas() {
        return this.evaluacionRealizadaService.findAll()
    }

    getEvaluacionRealizadaById(id: number) {
        return this.evaluacionRealizadaService.findById(id);
    }
}
