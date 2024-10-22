import { Controller, Get } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluacion')
export class EvaluacionController {
    constructor(private evaluacionService: EvaluacionService) {}

    @Get()
    getAllEvaluaciones() {
        return this.evaluacionService.findAll()
    }

    getEvaluacionById(id: number) {
        return this.evaluacionService.findById(id);
    }
}
