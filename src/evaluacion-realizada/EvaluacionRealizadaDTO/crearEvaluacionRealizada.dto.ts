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
import { PostLugarEvaluacionDTO } from 'src/lugar-evaluacion/LugarEvaluacionDTO/crearLugarEvaluacion.dto';

export class PostEvaluacionRealizadaDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsInt()
  modificacionPuntaje: number;

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

  @IsNotEmpty()
  @Type(() => PostLugarEvaluacionDTO)
  lugarEvaluacion: PostLugarEvaluacionDTO;
}
