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
  UseGuards
} from '@nestjs/common';
import { Docente } from './docente.entity';
import { DocenteService } from './docente.service';
import { PostDocenteRequestDTO } from './DocenteDTO/crearDocente.dto';
import { PutDocenteRequestDTO } from './DocenteDTO/putDocente.dto';
import { LoginDocenteDto } from './DocenteDTO/loginDocente.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/docente')
export class DocenteController {
  constructor(private docenteService: DocenteService) {}

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getDocenteById(@Param('id') id: number) {
    return this.docenteService.findById(id);
  }

  @Post('/login')
  @ApiBody({ type: LoginDocenteDto })
  login(@Body() body: LoginDocenteDto) {
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
