import { Controller, Get, Post, Delete, Body, Param, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Docente } from './docente.entity';
import { DocenteService } from './docente.service';
import { PostDocenteRequestDTO } from './DocenteDTO/crearDocente.dto';
import { PutDocenteRequestDTO } from './DocenteDTO/putDocente.dto';

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

    @Get('/email')
    getDocenteByEmail(@Param('email') email: string) {
        return this.docenteService.findByEmail(email)
    }

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true}))
    createDocente(@Body() docenteData: PostDocenteRequestDTO): Promise<Docente>{
        return this.docenteService.create(docenteData);
    }

    @Delete('/:id')
    deleteDocente(@Param('id') id: number) {
        return this.docenteService.delete(id);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe({whitelist: true}))
    modificarDocente(@Param('id') id: number, @Body() docenteData: PutDocenteRequestDTO) {
        return this.docenteService.modifyById(id, docenteData);
    }

}
