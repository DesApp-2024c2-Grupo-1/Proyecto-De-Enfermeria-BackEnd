import { IsString, IsNumber, IsEmail, IsArray, IsOptional } from 'class-validator';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';

export class PutDocenteDto {
  @IsNumber()
  id: number

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  dni?: number;

  @IsOptional()
  @IsString()
  password?: string;

  @IsArray()
  evaluacionRealizada: EvaluacionRealizada[];
}