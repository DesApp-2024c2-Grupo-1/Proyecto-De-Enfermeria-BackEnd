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

    // === Cabecera de columnas ===
    worksheet.columns = [
      { header: 'DNI', key: 'id', width: 20 },
      { header: 'Nombre', key: 'nombre', width: 20 },
      { header: 'Apellido', key: 'apellido', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
    ];
    // === Insertar los datos ===
    alumnos.forEach((a) => {
      worksheet.addRow({
        id: a.dni,
        nombre: a.nombre,
        apellido: a.apellido,
        email: a.email,
      });
    });

    // === Estilos de la cabecera ===
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // Blanco
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '55B589' }, // Verde suave
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        right: { style: 'thin', color: { argb: 'FFCCCCCC' } },
      };
    });

    // === Bordes para todas las filas ===
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          left: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          right: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      });
      row.height = 20;
    });

    // === Auto-filter en la fila 1 ===
    worksheet.autoFilter = {
      from: 'A1',
      to: 'D1',
    };

    // === Buffer final ===
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
