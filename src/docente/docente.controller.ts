import { Controller, Get } from '@nestjs/common';
import { DocenteService } from './docente.service';

@Controller('docente')
export class DocenteController {
    constructor(private docenteService: DocenteService) {}

    @Get()
    getAllDocentes() {
        return this.docenteService.findAll()
    }

    getDocenteById(id: number) {
        return this.docenteService.findById(id);
    }
}
