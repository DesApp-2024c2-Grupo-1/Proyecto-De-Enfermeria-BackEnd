import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Docente } from 'src/docente/docente.entity';
import { PostDocenteRequestDTO } from 'src/docente/DocenteDTO/crearDocente.dto';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { PostEvaluacionRealizadaDTO } from 'src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';
import { PostPreguntaRequestDTO } from 'src/pregunta/PreguntaDTO/crearPregunta.dto';

export class PostEvaluacionRequestDTO {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID de la evaluacion' 
  })
  id?: number;

  @ApiProperty({
    example: 'Determinar altura uterina',
    description: 'Titulo de la evaluacion. Minimo debe tener 5 caracteres',
  })
  @IsString()
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  titulo: string;

  @ApiProperty({
    description: 'Docente que crea la evaluacion'
  })
  @IsNotEmpty()
  @Type(() => Docente)
  docente: Docente;

  @ApiProperty({
    description: 'Lista de preguntas de la evaluacion',
    type: () => PostPreguntaRequestDTO,
    isArray: true,
    example: [
      {
        pregunta: 'Colocar a la persona gestante en posición decúbito dorsal',
        puntaje: 1     
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostPreguntaRequestDTO)
  @ArrayNotEmpty({ message: 'Debes agregar al menos 1 pregunta' })
  preguntas: PostPreguntaRequestDTO[];

  @ApiPropertyOptional({
    example: '2024-07-23',
    description: 'Fecha del alta de una evaluacion'
  })
  altaFecha?: Date;

  @ApiPropertyOptional({
    example: 1,
    description: 'El numero de version de la evaluacion'
  })
  version?: number;

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
  @Type(() => PostEvaluacionRealizadaDTO)
  evaluacionRealizada: EvaluacionRealizada[];
}
