import { Allow, IsDefined, IsEmail, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator'
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';

export class PostDocenteRequestDTO {

@IsString()
@MinLength(3)
@IsNotEmpty()
nombre: string;

@IsString()
@MinLength(3)
@IsNotEmpty()
apellido: string;

@IsEmail()
@IsNotEmpty()
email: string;

@IsInt()
@Min(1000000)
@IsNotEmpty()
dni: number;

@IsString()
@MinLength(8)
@IsNotEmpty()
password: string;


evaluacion: Evaluacion[];

evaluacionRealizada: EvaluacionRealizada[];
}