import { Controller, Get } from '@nestjs/common';
import { EvaluacionCuestionarioVersionadoService } from './evaluacion-cuestionario-versionado.service';

@Controller('evaluacion-cuestionario-versionado')
export class EvaluacionCuestionarioVersionadoController {
    constructor(private evaluacionCuestionarioVersionadoService: EvaluacionCuestionarioVersionadoService) {}

    @Get()
    getAllECVS() {
        return this.evaluacionCuestionarioVersionadoService.findAll()
    }

    getECVById(id: number) {
        return this.evaluacionCuestionarioVersionadoService.findById(id);
    }
}
