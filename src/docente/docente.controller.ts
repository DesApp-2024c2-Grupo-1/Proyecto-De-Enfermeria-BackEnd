import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
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
    getDocenteById(@Param('id') id: number) {
        return this.docenteService.findById(id);
    }

    @Get('/dni/:dni')
    getDocenteByDni(@Param('dni') dni: number) {
        return this.docenteService.findByDni(dni);
    }

    @Post()
    createDocente(@Body() docenteData: Docente) {
        return this.docenteService.create(docenteData);
    }

    @Delete('/:id')
    deleteDocente(@Param('id') id: number) {
        return this.docenteService.delete(id);
    }

    @Put('/:id')
    modificarDocente(@Param('id') id: number, @Body() docenteData: Docente) {
        return this.docenteService.modifyById(id, docenteData);
    }

}
