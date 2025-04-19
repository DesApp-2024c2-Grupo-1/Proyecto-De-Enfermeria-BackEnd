import { Controller, Get, Param } from '@nestjs/common';
import { LugarEvaluacion } from './lugar-evaluacion.entity';
import { LugarEvaluacionService } from './lugar-evaluacion.service';

@Controller('/lugarEvaluacion')
export class LugarEvaluacionController {
    constructor(private lugarEvaluacionService: LugarEvaluacionService) {}

    @Get()
    getAllDocentes() {
        return this.lugarEvaluacionService.findAll()
    }

    @Get('/:id')
    getDocenteById(@Param('id') id: number) {
        return this.lugarEvaluacionService.findById(id);
    }


}
