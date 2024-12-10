import { IsEmail, IsInt, IsNotEmpty, IsString, Min, Max,MinLength } from 'class-validator'
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';


export class PostAlumnoRequestDTO {

@IsString()
@MinLength(3, {message: "El nombre debe tener al menos 3 letras"})
@IsNotEmpty({message: "El nombre no puede estar vacío"})
nombre: string;

@IsString()
@MinLength(3, {message: "El apellido debe tener al menos 3 letras"})
@IsNotEmpty({message: "El apellido no puede estar vacío"})
apellido: string;

@IsEmail({}, { message: "El email debe ser válido" })
@IsNotEmpty({message: "El email no puede estar vacío"})
email: string;

@IsInt()
@Min(1000000, {message: "El DNI debe ser un número de al menos 8 caracteres"})
@Max(10000000, {message: "El DNI no puede tener mas de 8 caracteres"})
@IsNotEmpty({message: "El DNI no puede estar vacío"})
dni: number;

evaluacionRealizada: EvaluacionRealizada[];
}