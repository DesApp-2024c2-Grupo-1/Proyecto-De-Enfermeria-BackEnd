import {
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PostEvaluacionRealizadaDTO } from 'src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';

export class PostLugarEvaluacionDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @Type(() => PostEvaluacionRealizadaDTO)
  evaluacionRealizada?: PostEvaluacionRealizadaDTO;
}
