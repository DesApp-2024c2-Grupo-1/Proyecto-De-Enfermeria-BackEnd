import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { Pregunta } from "src/pregunta/pregunta.entity";

export class PostEvaluacionRequestDTO {

    @IsString()
    @MinLength(5, {message: "titulo debe tener al menos 5 caracteres"})
    @IsNotEmpty()
    titulo: string;

    pregunta: Pregunta[];
    evaluacionRealizada: EvaluacionRealizada[];
}