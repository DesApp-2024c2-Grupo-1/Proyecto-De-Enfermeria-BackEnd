import { IsEmail, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator'
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';

export class PostDocenteRequestDTO {

@IsString()
@MinLength(3, {message: "nombre debe tener al menos 3 letras"})
@IsNotEmpty({message: "nombre no puede estar vacío"})
nombre: string;

@IsString({message: "apellido"})
@MinLength(3, {message: "apellido debe tener al menos 3 letras"})
@IsNotEmpty({message: "apellido no puede estar vacío"})
apellido: string;

@IsEmail()
@IsNotEmpty()
email: string;

@IsInt()
@Min(1000000, {message: "dni debe ser válido"})
@IsNotEmpty()
dni: number;

@IsString()
@MinLength(8, {message: "password debe tener al menos 8 caracteres"})
@IsNotEmpty()
password: string;


evaluacion: Evaluacion[];

evaluacionRealizada: EvaluacionRealizada[];
}