import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { PostDocenteRequestDTO } from 'src/docente/DocenteDTO/crearDocente.dto';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { PostEvaluacionRealizadaDTO } from 'src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';
import { PostPreguntaRequestDTO } from 'src/pregunta/PreguntaDTO/crearPregunta.dto';
export class PutEvaluacionRequestDTO {
  id?: number;

  @IsNotEmpty()
  @Type(() => PostDocenteRequestDTO)
  docente: PostDocenteRequestDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostPreguntaRequestDTO)
  @ArrayNotEmpty({ message: 'Debes agregar al menos 1 pregunta' })
  preguntas: PostPreguntaRequestDTO[];

  altaFecha?: Date;

  @Type(() => PostEvaluacionRealizadaDTO)
  evaluacionRealizada: EvaluacionRealizada[];

  @IsInt()
  version: number

  //@IsInt()
  //evaluacion: number;
}
