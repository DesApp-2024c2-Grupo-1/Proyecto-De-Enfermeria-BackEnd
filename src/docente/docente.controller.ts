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
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { Roles } from 'src/auth/auth.roles.decorator';
import { Rol } from 'src/auth/auth.roles.enum';

@ApiTags('Docente')
@Controller('/docente')
export class DocenteController {
  constructor(private docenteService: DocenteService) {}

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar docente por ID (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Modificar un docente existente' })
  modificarDocente(
    @Param('id') id: number,
    @Body() docenteData: PutDocenteRequestDTO,
  ) {
    return this.docenteService.modifyById(id, docenteData);
  }
}
