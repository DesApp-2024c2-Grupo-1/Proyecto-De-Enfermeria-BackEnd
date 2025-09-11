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
import { ApiBody, ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Docente')
@Controller('/docente')
export class DocenteController {
  constructor(private docenteService: DocenteService) {}

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener docente por ID (requiere JWT)'})
  getDocenteById(@Param('id') id: number) {
    return this.docenteService.findById(id);
  }

  @Post('/login')
  @ApiBody({ type: LoginDocenteDto })
  @ApiOperation({ summary: 'Login de docente, devuelve JWT' })
  login(@Body() body: LoginDocenteDto) {
    return this.docenteService.loginDocente(body.dni, body.password);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Crear un nuevo docente' })
  createDocente(@Body() docenteData: PostDocenteRequestDTO): Promise<Docente> {
    return this.docenteService.create(docenteData);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Modificar un docente existente' })
  modificarDocente(
    @Param('id') id: number,
    @Body() docenteData: PutDocenteRequestDTO,
  ) {
    return this.docenteService.modifyById(id, docenteData);
  }
}
