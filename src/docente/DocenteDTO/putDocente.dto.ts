import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

export class PutDocenteRequestDTO {
@ApiPropertyOptional({
    example: 'Ada',
    description: 'Nombre del docente. Minimo debe tener 3 caracteres', 
})
@IsString()
@MinLength(3, { message: "El nombre debe tener al menos 3 letras" })
@IsOptional()
nombre?: string;

@ApiPropertyOptional({
    example: 'Lovelace',
    description: 'Apellido del docente (mínimo 3 letras)',
  })
@IsString({ message: "El apellido debe ser una cadena de caracteres" })
@MinLength(3, { message: "El apellido debe tener al menos 3 letras" })
@IsOptional()
apellido?: string;
}