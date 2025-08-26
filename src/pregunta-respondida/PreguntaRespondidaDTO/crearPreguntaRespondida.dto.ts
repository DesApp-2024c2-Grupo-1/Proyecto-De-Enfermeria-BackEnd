import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostPreguntaRequestDTO } from 'src/pregunta/PreguntaDTO/crearPregunta.dto';
import { PostEvaluacionRealizadaDTO } from 'src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';

export class PostPreguntaRespondidaRequestDTO {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID de la pregunta respondida' 
  })
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: true,
    description: 'La respuesta de la pregunta true o false.'
  })
  @IsNotEmpty()
  respuesta: boolean;

  @ApiPropertyOptional({
      type: () => PostEvaluacionRealizadaDTO
    })
  @IsOptional()
  @Type(() => PostEvaluacionRealizadaDTO)
  evaluacionRealizada?: PostEvaluacionRealizadaDTO;

  @ApiPropertyOptional({
    type: () => PostPreguntaRequestDTO
  })
  @IsOptional()
  @Type(() => PostPreguntaRequestDTO)
  preguntas?: PostPreguntaRequestDTO[];
}
