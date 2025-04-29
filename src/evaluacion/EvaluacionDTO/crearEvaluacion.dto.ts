import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostDocenteRequestDTO } from 'src/docente/DocenteDTO/crearDocente.dto';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { PostEvaluacionRealizadaDTO } from 'src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';
import { PostPreguntaRequestDTO } from 'src/pregunta/PreguntaDTO/crearPregunta.dto';
import { TipoEvaluacion } from 'src/tipo-evaluacion/tipo-evaluacion.entity';

export class PostEvaluacionRequestDTO {
  id?: number;

  @IsString()
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  titulo: string;

  @IsNotEmpty()
  @Type(() => PostDocenteRequestDTO)
  docente: PostDocenteRequestDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostPreguntaRequestDTO)
  @ArrayNotEmpty({ message: 'Debes agregar al menos 1 pregunta' })
  preguntas: PostPreguntaRequestDTO[];

  altaFecha?: Date;

  tipoEvaluacion: TipoEvaluacion;

  @Type(() => PostEvaluacionRealizadaDTO)
  evaluacionRealizada: EvaluacionRealizada[];
}
