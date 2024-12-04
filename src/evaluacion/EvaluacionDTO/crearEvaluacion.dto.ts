import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator";
import { PostDocenteRequestDTO } from "src/docente/DocenteDTO/crearDocente.dto";
//import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { PostPreguntaRequestDTO } from "src/pregunta/PreguntaDTO/crearPregunta.dto";

export class PostEvaluacionRequestDTO {

    @IsString()
    @MinLength(5, {message: "titulo debe tener al menos 5 caracteres"})
    @IsNotEmpty()
    titulo: string;

    @IsNotEmpty()
    @Type(() => PostDocenteRequestDTO)
    docente: PostDocenteRequestDTO

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PostPreguntaRequestDTO)
    preguntas: PostPreguntaRequestDTO[];

    /*evaluacionRealizada: EvaluacionRealizada[];*/
}