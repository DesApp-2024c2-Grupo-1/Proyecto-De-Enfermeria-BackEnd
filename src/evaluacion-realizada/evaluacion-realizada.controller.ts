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
  UseGuards,
  Res
} from '@nestjs/common';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';
import { EvaluacionService } from 'src/evaluacion/evaluacion.service';
import { PostEvaluacionRealizadaDTO } from './EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { Rol } from 'src/auth/auth.roles.enum';
import { Roles } from 'src/auth/auth.roles.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import * as ExcelJS from "exceljs";
import { Response } from 'express';

@Controller('/evaluacion-realizada')
export class EvaluacionRealizadaController {
  constructor(private evaluacionRealizadaService: EvaluacionRealizadaService, private evaluacionService: EvaluacionService) {}

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consulta evaluacion realizada por ID (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getEvaluacionRealizadaById(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findById(id);
  }

  //

  @Get('/exportar/excel/:idEvaluacion')
async exportarAlumnosPorEvaluacionAExcel(
  @Param('idEvaluacion') idEvaluacion: number,
  @Res() res: Response,
) {
  const alumnos = await this.evaluacionRealizadaService
    .findAllEvaluacionesDeAlumnosPorModelo(idEvaluacion);
  
  const evaluacion = await this.evaluacionService.findById(idEvaluacion); 

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Alumnos');

  // ------------------------------------------------------------------
  // 1️⃣ OBTENER TODAS LAS PREGUNTAS DEL MODELO (del primer alumno)
  // ------------------------------------------------------------------
  const primeraEval = alumnos[0]?.evaluacionesRealizadas[0];

  if (!primeraEval) {
    throw new Error('No existen evaluaciones para exportar');
  }

  // Ordenar preguntas por “orden”
  const preguntasOrdenadas = [...primeraEval.preguntaRespondida].sort(
    (a, b) => a.pregunta.orden - b.pregunta.orden,
  );

  // ------------------------------------------------------------------
  // 2️⃣ DEFINIR HEADERS
  // ------------------------------------------------------------------
  const headers = [
    'DNI',
    'Nombre',
    'Apellido',
    'Modelo',
    'Fecha',
    'Nota',
    ...preguntasOrdenadas.map((p, i) => `Pregunta ${i + 1}`), // P1, P2, P3...
  ];

  worksheet.addRow(headers);

  // ------------------------------------------------------------------
  // 3️⃣ AGREGAR FILAS (uno por cada intento del alumno)
  // ------------------------------------------------------------------
  alumnos.forEach(alumno => {
    alumno.evaluacionesRealizadas.forEach(evalR => {
      const respuestasOrdenadas = [...evalR.preguntaRespondida].sort(
        (a, b) => a.pregunta.orden - b.pregunta.orden,
      );

      const fila = [
        alumno.dni,
        alumno.nombre,
        alumno.apellido,
        evaluacion.titulo,
        evalR.fecha,
        evalR.nota,
        ...respuestasOrdenadas.map(pr => (pr.respuesta ? 1 : 0)),
      ];

      worksheet.addRow(fila);
    });
  });

  // ------------------------------------------------------------------
  // 4️⃣ ESTILOS (opcionales)
  // ------------------------------------------------------------------
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.columns = headers.map(() => ({ width: 20 }));

  worksheet.eachRow({ includeEmpty: false }, row => {
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });

  // ------------------------------------------------------------------
  // 5️⃣ DESCARGA DEL EXCEL
  // ------------------------------------------------------------------
  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="evaluacion.xlsx"',
  );

  res.send(buffer);
}



  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Registrar evaluacion (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crearEvaluacionRealizada(@Body() data: PostEvaluacionRealizadaDTO) {
    return this.evaluacionRealizadaService.crearEvaluacionRealizada(data);
  }

  @Get('evaluaciones-alumno/:idEvaluacion/:idAlumno')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar evaluaciones de un alumno (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findAllEvaluacionesDeUnAlumno(
    @Param('idEvaluacion') idEvaluacion: number,
    @Param('idAlumno') idAlumno: number,
  ) {
    return this.evaluacionRealizadaService.findAllEvaluacionesDeUnAlumno(
      idEvaluacion,
      idAlumno,
    );
  }

  @Get('evaluaciones-realizadas/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar todos los alumnos que realizaron una evaluacion (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findAllAlumnosPorEvaluacion(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllAlumnosPorEvaluacion(id);
  }

  @Get('evaluaciones-realizadas-excel/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar todos las evaluaciones realizadas por alumnos de un modelo (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findAllEvaluacionesDeAlumnosPorModelo(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllEvaluacionesDeAlumnosPorModelo(id);
  }

  @Get('evaluaciones-realizadas-por-alumno/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar todas las evaluaciones realizadas por un alummno (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findAllEvaluacionesPorAlumno(@Param('id') id: number) {
    return this.evaluacionRealizadaService.findAllEvaluacionesPorAlumno(id);
  }



  //Para el dropdown
  @Get('evaluaciones-realizadas-alumno/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Consultar evaluaciones realizadas por un alumno de un modelo (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findEvaluacionesDeUnAlumno(@Param('id') alumnoId: number) {
    return this.evaluacionRealizadaService.findEvaluacionesDeUnAlumno(alumnoId);
  }
}