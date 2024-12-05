import { IsEmail, IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

export class PutDocenteRequestDTO {

@IsString()
@MinLength(3, { message: "El nombre debe tener al menos 3 letras" })
@IsOptional()
nombre: string;

@IsString({ message: "El apellido debe ser una cadena de caracteres" })
@MinLength(3, { message: "El apellido debe tener al menos 3 letras" })
@IsOptional()
apellido?: string;

@IsEmail({}, { message: "El email debe ser válido" })
@IsOptional()
email?: string;

@IsInt({ message: "El DNI debe ser un número" })
@Min(1000000, { message: "El DNI debe ser un número de al menos 7 caracteres" })
@Max(99999999, { message: "El DNI debe ser un número de hasta 8 caracteres" })
@IsOptional() 
dni?: number;

@IsString({ message: "La contraseña debe ser una cadena de caracteres" })
@MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
@IsOptional()  
password?: string;

evaluacion?: Evaluacion[];
evaluacionRealizada?: EvaluacionRealizada[];

}