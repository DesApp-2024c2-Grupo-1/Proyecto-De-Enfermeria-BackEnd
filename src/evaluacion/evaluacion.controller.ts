import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { Evaluacion } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';
import { PostEvaluacionRequestDTO } from './EvaluacionDTO/crearEvaluacion.dto';
import { PutEvaluacionRequestDTO } from './EvaluacionDTO/updateEvaluacion.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { Roles } from 'src/auth/auth.roles.decorator';
import { Rol } from 'src/auth/auth.roles.enum';

@Controller('/evaluacion')
export class EvaluacionController {
  constructor(private evaluacionService: EvaluacionService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener todas las evaluaciones (requiere JWT)'})
  getAllEvaluaciones() {
    return this.evaluacionService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener evaluacion por ID (requiere JWT)'})
  getEvaluacionById(@Param('id') id: number) {
    return this.evaluacionService.findById(id);
  }

  @Get('/versiones/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener version de evaluacion por ID (requiere JWT)'})
  getAllVersionesDeEvaluacionPorId(@Param('id') id: number) {
    return this.evaluacionService.findAllVersionesDeEvaluacionById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Deshabilitar evaluacion por ID (requiere JWT)'})
  deshabilitarEvaluacion(@Param('id') id: number) {
    return this.evaluacionService.deshabilitarEvaluacion(id);
  }

  @Put('/modificar-evaluacion/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Modificar evaluacion por ID (requiere JWT)'})
  modificarEvaluacion(
    @Body() data: PutEvaluacionRequestDTO,
    @Param('id') id: number,
  ) {
    return this.evaluacionService.modificarEvaluacion(data, id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Crear evaluacion por ID (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crearEvaluacion(@Body() data: PostEvaluacionRequestDTO) {
    return this.evaluacionService.createEvaluacionYPreguntas(data);
  }
}
