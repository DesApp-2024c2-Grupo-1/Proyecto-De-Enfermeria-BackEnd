import { Controller, Get } from '@nestjs/common';
import { CuestionarioService } from './cuestionario.service';

@Controller('cuestionario')
export class CuestionarioController {
    constructor(private cuestionarioService: CuestionarioService) {}

    @Get()
    getAllCuestionarios() {
        return this.cuestionarioService.findAll()
    }

    getCuestionarioById(id: number) {
        return this.cuestionarioService.findById(id);
    }
}
