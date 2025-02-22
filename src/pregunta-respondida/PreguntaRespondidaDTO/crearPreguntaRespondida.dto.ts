import { IsNotEmpty } from "class-validator"
import { Type } from "class-transformer";
import { PostPreguntaRequestDTO } from "src/pregunta/PreguntaDTO/crearPregunta.dto";
import { PostEvaluacionRealizadaDTO } from "src/evaluacion-realizada/EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto"

export class PostPreguntaRespondidaRequestDTO {

    respuesta: boolean

    @IsNotEmpty()
    @Type(() => PostEvaluacionRealizadaDTO)
    evalaucionRealizada: PostEvaluacionRealizadaDTO

    @IsNotEmpty()
    @Type(() => PostPreguntaRequestDTO)
    preguntas: PostPreguntaRequestDTO;
}