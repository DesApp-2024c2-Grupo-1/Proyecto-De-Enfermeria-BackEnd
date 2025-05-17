import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LugarEvaluacion } from './lugar-evaluacion.entity';
import { LugarEvaluacionService } from './lugar-evaluacion.service';
import { PostLugarEvaluacionDTO } from './LugarEvaluacionDTO/crearLugarEvaluacion.dto';

@Controller('/lugarEvaluacion')
export class LugarEvaluacionController {
    constructor(private lugarEvaluacionService: LugarEvaluacionService) {}

    @Get()
    getAllLugarEvaluacion() {
        return this.lugarEvaluacionService.findAll()
    }

    @Get('/:id')
    getLugarEvaluacionById(@Param('id') id: number) {
        return this.lugarEvaluacionService.findById(id);
    }

    @Post()
        crearLugarEvaluacion(@Body() lugarEvaluacionData: LugarEvaluacion){
            return this.lugarEvaluacionService.create(lugarEvaluacionData);
        }


}
