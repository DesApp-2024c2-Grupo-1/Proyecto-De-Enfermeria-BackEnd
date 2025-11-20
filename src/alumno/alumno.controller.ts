import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Res
} from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AlumnoService } from './alumno.service';
import { PostAlumnoRequestDTO } from './AlumnoDTO/crearAlumno.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { Rol } from 'src/auth/auth.roles.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/auth.roles.decorator';
import * as ExcelJS from "exceljs";
import { Response } from 'express';



@Controller('/alumno')
export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener todos los alumnos (requiere JWT)'})
  getAllAlumnos() {
    return this.alumnoService.findAll();
  }
  
  //

@Get('/exportar/excel')
async exportarAlumnosAExcel(@Res() res: Response) {
  const alumnos = await this.alumnoService.findAll();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Alumnos');

  // ------------------------------------------------
  // 1️⃣ HEADERS
  // ------------------------------------------------
  const headers = ['DNI', 'Nombre', 'Apellido', 'Correo electrónico'];
  worksheet.addRow(headers);

  // ------------------------------------------------
  // 2️⃣ FILAS
  // ------------------------------------------------
  alumnos.forEach(alumno => {
    worksheet.addRow([
      alumno.dni,
      alumno.nombre,
      alumno.apellido,
      alumno.email,
    ]);
  });

  // ------------------------------------------------
  // 3️⃣ ESTILOS UNIFICADOS (IGUAL QUE EL OTRO EXCEL)
  // ------------------------------------------------

  // Header
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  // Columnas con el mismo ancho y estilo
  worksheet.columns = headers.map(() => ({
    width: 20
  }));

  // Bordes y alineación igual al otro export
  worksheet.eachRow({ includeEmpty: false }, row => {
    row.height = 20;

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

  // ------------------------------------------------
  // 4️⃣ DESCARGA DEL ARCHIVO
  // ------------------------------------------------
  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="alumnos.xlsx"',
  );

  res.send(buffer);
}




  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener alumno por ID (requiere JWT)'})
  getAlumnoById(@Param('id') id: number) {
    return this.alumnoService.findById(id);
  }

  @Post()
  @ApiOperation({summary: 'Crear alumno'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createAlumno(@Body() alumnoData: PostAlumnoRequestDTO): Promise<Alumno> {
    return this.alumnoService.create(alumnoData);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Rol.Docente, Rol.Admin)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Modificar alumno por ID (requiere JWT)'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  modificarAlumno(@Param('id') id: number, @Body() alumnoData: Alumno) {
    return this.alumnoService.modifyById(id, alumnoData);
  }
}
