import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { CrearDocenteDto } from './dto/crear-docente.dto'
import { PutDocenteDto } from './dto/put-docente.dto';
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
    createDocente(@Body() docenteData: CrearDocenteDto) {
        return this.docenteService.create(docenteData);
    }

    @Delete('/:id')
    deleteDocente(@Param('id') id: number) {
        return this.docenteService.delete(id);
    }

    @Put('/:id')
    modificarDocente(@Param('id') id: number, @Body() docenteData: PutDocenteDto) {
        return this.docenteService.modifyById(id, docenteData);
    }
    
}
