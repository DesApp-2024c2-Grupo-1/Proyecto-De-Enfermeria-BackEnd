import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { Docente } from './docente.entity';
import { DocenteService } from './docente.service';

@Controller('/docente')
export class DocenteController {
    constructor(private docenteService: DocenteService) {}

    @Get()
    getAllDocentes() {
        return this.docenteService.findAll()
    }

    @Get('/:id')
    getDocenteById(@Param(':id') id: number) {
        return this.docenteService.findById(id);
    }

    @Post()
    createDocente(@Body() docenteData: Docente) {
        return this.docenteService.create(docenteData);
    }

    @Delete('/:id')
    deleteDocente(@Param('id') id: number) {
        return this.docenteService.delete(id);
    }


}
