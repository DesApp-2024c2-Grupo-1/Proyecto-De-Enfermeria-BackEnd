import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

export class PutDocenteRequestDTO {

@IsString()
@MinLength(3, { message: "El nombre debe tener al menos 3 letras" })
@IsOptional()
nombre?: string;

@IsString({ message: "El apellido debe ser una cadena de caracteres" })
@MinLength(3, { message: "El apellido debe tener al menos 3 letras" })
@IsOptional()
apellido?: string;
}