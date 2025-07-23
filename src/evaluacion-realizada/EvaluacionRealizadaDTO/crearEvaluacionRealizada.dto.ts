import {
  IsString,
  MinLength,
  IsInt,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostDocenteRequestDTO } from 'src/docente/DocenteDTO/crearDocente.dto';
import { PostAlumnoRequestDTO } from 'src/alumno/AlumnoDTO/crearAlumno.dto';
import { PostPreguntaRespondidaRequestDTO } from 'src/pregunta-respondida/PreguntaRespondidaDTO/crearPreguntaRespondida.dto';
import { PostEvaluacionRequestDTO } from 'src/evaluacion/EvaluacionDTO/crearEvaluacion.dto';
import { PostLugarEvaluacionDTO } from 'src/lugar-evaluacion/LugarEvaluacionDTO/crearLugarEvaluacion.dto';

export class PostEvaluacionRealizadaDTO {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID de la evaluacion realizada' 
  })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({
    example: 'El alumno no tuvo buen trato con el paciente.',
    description:'Observacion que el Docente puede hacer sobre la practica.'
  })
  @IsOptional()
  @IsString()
  observacion?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Modificacion de puntaje al total de la evaluacion'
  })
  @IsOptional()
  @IsInt()
  modificacionPuntaje: number;

  @ApiProperty({
    example: '2024-07-23',
    description: 'Fecha en la que se realiza una evaluacion'
  })
  fecha: Date;

  @ApiProperty({
    description: 'Docente que realizó la evaluación',
    type: () => PostDocenteRequestDTO
  })
  @IsNotEmpty()
  @Type(() => PostDocenteRequestDTO)
  docente: PostDocenteRequestDTO;

  @ApiProperty({
    description: 'Alumno que fue evaluado',
    type: () => PostAlumnoRequestDTO
  })
  @IsNotEmpty()
  @Type(() => PostAlumnoRequestDTO)
  alumno: PostAlumnoRequestDTO;

  @ApiProperty({
    description: 'Modelo de evaluacion que se está realizando',
    type: () => PostEvaluacionRequestDTO
  })
  @IsNotEmpty()
  @Type(() => PostEvaluacionRequestDTO)
  evaluacion: PostEvaluacionRequestDTO;


  @ApiPropertyOptional({
    description: 'Lista de preguntas respondidas de la evaluacion realizada',
    type: () => PostPreguntaRespondidaRequestDTO,
    isArray: true,
    example:[
      {
        pregunta:{
          id: 1,
          pregunta: 'Colocar a la persona gestante en posición decúbito dorsal',
          puntaje: 1,
          orden: 1,
          evaluacion: { id: 1 }
        },
        respuesta: true
      }
    ]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostPreguntaRespondidaRequestDTO)
  preguntaRespondida?: PostPreguntaRespondidaRequestDTO[];

  @ApiProperty({
    description: 'Lugar en el que se realizó la evaluación',
    type: () => PostLugarEvaluacionDTO
  })
  @IsNotEmpty()
  @Type(() => PostLugarEvaluacionDTO)
  lugarEvaluacion: PostLugarEvaluacionDTO;
}
