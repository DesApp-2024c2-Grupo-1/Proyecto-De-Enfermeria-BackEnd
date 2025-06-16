import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Docente } from './docente.entity';
import { DocenteService } from './docente.service';
import { PostDocenteRequestDTO } from './DocenteDTO/crearDocente.dto';
import { PutDocenteRequestDTO } from './DocenteDTO/putDocente.dto';

@Controller('/docente')
export class DocenteController {
  constructor(private docenteService: DocenteService) {}

  @Get('/:id')
  getDocenteById(@Param('id') id: number) {
    return this.docenteService.findById(id);
  }

  @Post('/login')
  login(@Body() body: { dni: number; password: string }) {
    return this.docenteService.loginDocente(body.dni, body.password);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createDocente(@Body() docenteData: PostDocenteRequestDTO): Promise<Docente> {
    return this.docenteService.create(docenteData);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  modificarDocente(
    @Param('id') id: number,
    @Body() docenteData: PutDocenteRequestDTO,
  ) {
    return this.docenteService.modifyById(id, docenteData);
  }
}
