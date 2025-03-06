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
import { PostDocenteRequestDTO } from 'src/docente/DocenteDTO/crearDocente.dto';
import { PostAlumnoRequestDTO } from 'src/alumno/AlumnoDTO/crearAlumno.dto';
import { PostPreguntaRespondidaRequestDTO } from 'src/pregunta-respondida/PreguntaRespondidaDTO/crearPreguntaRespondida.dto';
import { PostEvaluacionRequestDTO } from 'src/evaluacion/EvaluacionDTO/crearEvaluacion.dto';

export class PostEvaluacionRealizadaDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  observacion: string;

  @IsOptional()
  @IsInt()
  modificacionPuntaje: Number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  lugarPractica: string;

  fecha: Date;

  @IsNotEmpty()
  @Type(() => PostDocenteRequestDTO)
  docente: PostDocenteRequestDTO;

  @IsNotEmpty()
  @Type(() => PostAlumnoRequestDTO)
  alumno: PostAlumnoRequestDTO;

  @IsNotEmpty()
  @Type(() => PostEvaluacionRequestDTO)
  evaluacion: PostEvaluacionRequestDTO;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostPreguntaRespondidaRequestDTO)
  preguntaRespondida?: PostPreguntaRespondidaRequestDTO[];
}
