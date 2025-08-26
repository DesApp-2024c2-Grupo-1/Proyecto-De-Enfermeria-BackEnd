import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';

export class PostDocenteRequestDTO {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID del docente' 
  })
  id?: number;

  @ApiProperty({
    example: 'Maria',
    description: 'Nombre del docente. Minimo debe tener 3 caracteres',
  })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 letras' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    example: 'Walsh',
    description: 'Apellido del docente. Minimo debe tener 3 caracteres',
  })
  @IsString({ message: 'El apellido debe ser una cadena de caracteres' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 letras' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  apellido: string;

  @ApiProperty({
    example: 'maria.walsh@example.com',
    description: 'Email del docente'
  })
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacio' })
  email: string;

  @ApiProperty({
    example: 12345678,
    description: 'DNI del docente. Debe tener 8 caracteres'
  })
  @IsInt({ message: 'El DNI debe ser un número' })
  @Min(9999999, {
    message: 'El DNI debe ser un número de al menos 8 caracteres',
  })
  @Max(100000000, { message: 'El DNI no puede tener mas de 8 caracteres' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  dni: number;
  
  @ApiProperty({
    example: 'asdf1234',
    description: 'Contraseña del docente. Debe tener al menos 8 caracteres'
  })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacia' })
  password: string;
}
