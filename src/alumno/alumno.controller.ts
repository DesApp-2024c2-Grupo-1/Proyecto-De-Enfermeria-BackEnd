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
  Res
} from '@nestjs/common';
import { Alumno } from 'src/alumno/alumno.entity';
import { AlumnoService } from './alumno.service';
import { PostAlumnoRequestDTO } from './AlumnoDTO/crearAlumno.dto';
import * as ExcelJS from "exceljs";
import { Response } from "express";

@Controller('/alumno')
export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  @Get()
  getAllAlumnos() {
    return this.alumnoService.findAll();
  }

 

  @Get('/exportar/excel')
  async exportarAlumnosAExcel(@Res() res: Response) {
    const alumnos = await this.alumnoService.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Alumnos');

    worksheet.addRow(['ID', 'Nombre', 'Apellido', 'Email']);

    alumnos.forEach(alumno => {
      worksheet.addRow([alumno.id, alumno.nombre, alumno.apellido, alumno.email]);
    }
    );

    const buffer = await workbook.xlsx.writeBuffer();
    
res.setHeader(
  'Content-Type',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
);
res.setHeader('Content-Disposition', 'attachment; filename=alumnos.xlsx');
res.send(buffer);
  }

   @Get('/:id')
  getAlumnoById(@Param('id') id: number) {
    return this.alumnoService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createAlumno(@Body() alumnoData: PostAlumnoRequestDTO): Promise<Alumno> {
    return this.alumnoService.create(alumnoData);
  }

  @Put('/:id')
  modificarAlumno(@Param('id') id: number, @Body() alumnoData: Alumno) {
    return this.alumnoService.modifyById(id, alumnoData);
  }
}
