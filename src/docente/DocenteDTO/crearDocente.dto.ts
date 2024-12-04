import { IsEmail, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator'
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';

export class PostDocenteRequestDTO {

@IsString({message: "nombre debe ser una cadena de caracteres"})
@MinLength(3, {message: "nombre debe tener al menos 3 letras"})
@IsNotEmpty({message: "nombre no puede estar vacío"})
nombre: string;

@IsString({message: "apellido debe ser una cadena de caracteres"})
@MinLength(3, {message: "apellido debe tener al menos 3 letras"})
@IsNotEmpty({message: "apellido no puede estar vacío"})
apellido: string;

@IsEmail()
@IsNotEmpty({message: "email no puede estar vacio"})
email: string;

@IsInt({message: "dni debe ser un numero"})
@Min(1000000, {message: "dni debe ser un numero de al menos 7 caracteres"})
@IsNotEmpty({message: "dni no puede estar vacio"})
dni: number;

@IsString({message: "password debe ser una cadena de caracteres"})
@MinLength(8, {message: "password debe tener al menos 8 caracteres"})
@IsNotEmpty({message: "password no puede estar vacio"})
password: string;


evaluacion: Evaluacion[];

evaluacionRealizada: EvaluacionRealizada[];
}