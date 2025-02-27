import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PostPreguntaRequestDTO } from 'src/pregunta/PreguntaDTO/crearPregunta.dto';
import { PostEvaluacionRealizadaDTO } from 'src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';

export class PostPreguntaRespondidaRequestDTO {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  respuesta: boolean;

  @IsOptional()
  @Type(() => PostEvaluacionRealizadaDTO)
  evaluacionRealizada?: PostEvaluacionRealizadaDTO;

  @IsOptional()
  @Type(() => PostPreguntaRequestDTO)
  preguntas?: PostPreguntaRequestDTO[];
}
