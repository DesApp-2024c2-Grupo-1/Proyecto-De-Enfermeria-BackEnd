import { IsString, IsNumber, IsEmail, IsOptional, IsArray } from 'class-validator';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';

export class CrearDocenteDto {
  @IsNumber()
  id: number

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  email: string;

  @IsNumber()
  dni: number;

  @IsString()
  password: string;

  @IsArray()
  evaluacionRealizada: EvaluacionRealizada[];
}
