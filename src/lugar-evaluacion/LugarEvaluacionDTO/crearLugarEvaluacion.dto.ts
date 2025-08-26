import {
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostEvaluacionRealizadaDTO } from 'src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';

export class PostLugarEvaluacionDTO {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID del Lugar Evaluacion' 
  })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({
    example: 'Campo Practico',
    description: 'Nombre del lugar de evaluacion.',
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Evaluaciones realizadas',
    type: () => PostEvaluacionRealizadaDTO,
    isArray: true,
    example: [
      {
        alumnoId:1,
        puntaje: 8,
        fecha: '2025-07-23'
      }
    ]
  })
  @IsOptional()
  @Type(() => PostEvaluacionRealizadaDTO)
  evaluacionRealizada?: PostEvaluacionRealizadaDTO;
}
