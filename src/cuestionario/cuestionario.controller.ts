import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { Cuestionario } from './cuestionario.entity';
import { CuestionarioService } from './cuestionario.service';

@Controller('/cuestionario')
export class CuestionarioController {
    constructor(private cuestionarioService: CuestionarioService) {}

    @Get()
    getAllCuestionarios() {
        return this.cuestionarioService.findAll()
    }

    @Get('/:id')
    getCuestionarioById(@Param('id') id: number) {
        return this.cuestionarioService.findById(id);
    }

    
    @Post()
    createCuestionario(@Body() cuestionarioData: Cuestionario) {
        return this.cuestionarioService.create(cuestionarioData);
    }

    @Delete('/:id')
    deleteCuestionario(@Param('id') id: number) {
        return this.cuestionarioService.delete(id);
    }
}
