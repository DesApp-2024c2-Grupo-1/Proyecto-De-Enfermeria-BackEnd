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

export class PostAlumnoRequestDTO {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'ID del alumno' 
  })
  id?: number;

  @ApiProperty({
    example: 'Julieta',
    description: 'Nombre del alumno. Minimo debe tener 3 caracteres',
  })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 letras' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    example: 'Lanteri',
    description: 'Apellido del alumno. Minimo debe tener 3 caracteres',
  })
  @IsString()
  @MinLength(3, { message: 'El apellido debe tener al menos 3 letras' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  apellido: string;

  @ApiProperty({
    example: 'julieta.lanteri@example.com',
    description: 'Email del alumno'
  })
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  email: string;

  @ApiProperty({
    example: 12345678,
    description: 'DNI del alumno. Debe tener 8 caracteres'
  })
  @IsInt()
  @Min(9999999, {
    message: 'El DNI debe ser un número de al menos 8 caracteres',
  })
  @Max(100000000, { message: 'El DNI no puede tener mas de 8 caracteres' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  dni: number;

  @ApiPropertyOptional({
    example: '2024-07-23',
    description: 'Fecha del alta de alumno'
  })
  altaFecha?: Date;

  @ApiPropertyOptional({
    type: () => EvaluacionRealizada,
    isArray: true,
    description: 'Lista de evaluaciones realizadas por el alumno'
  })
  evaluacionRealizada?: EvaluacionRealizada[];
}
