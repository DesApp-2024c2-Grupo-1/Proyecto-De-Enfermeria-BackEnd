import {
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostEvaluacionRequestDTO } from 'src/evaluacion/EvaluacionDTO/crearEvaluacion.dto';
import { PreguntaRespondida } from 'src/pregunta-respondida/pregunta-respondida.entity';

export class PostPreguntaRequestDTO {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID de la pregunta' 
  })
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: 'Colocar a la persona gestante en posición decúbito dorsal.',
    description: 'Texto de la pregunta.'
  })
  @IsString()
  @IsNotEmpty({ message: 'La pregunta no puede estar vacía' })
  @MinLength(5, { message: 'La pregunta debe tener al menos 5 caracteres' })
  pregunta: string;

  @ApiProperty({
    example: 5,
    description: 'Puntaje asignado a la pregunta.'
  })
  @IsInt()
  @IsNotEmpty({ message: 'El puntaje no puede estar vacío' })
  @Min(1, { message: 'El puntaje debe ser como mínimo 1' })
  puntaje: number;

  @ApiPropertyOptional({
    type: () => PreguntaRespondida
  })
  @IsOptional()
  preguntaRespondida?: PreguntaRespondida;

  @ApiProperty({
    type: () => PostEvaluacionRequestDTO
  })
  evaluacion: PostEvaluacionRequestDTO;
}
