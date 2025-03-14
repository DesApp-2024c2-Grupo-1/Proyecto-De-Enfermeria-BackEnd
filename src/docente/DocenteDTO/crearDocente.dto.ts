import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';

export class PostDocenteRequestDTO {
  id?: number;

  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 letras' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsString({ message: 'El apellido debe ser una cadena de caracteres' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 letras' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  apellido: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacio' })
  email: string;

  @IsInt({ message: 'El DNI debe ser un número' })
  @Min(9999999, {
    message: 'El DNI debe ser un número de al menos 8 caracteres',
  })
  @Max(100000000, { message: 'El DNI no puede tener mas de 8 caracteres' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  dni: number;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacio' })
  password: string;

  evaluacion: Evaluacion[];

  evaluacionRealizada: EvaluacionRealizada[];
}
