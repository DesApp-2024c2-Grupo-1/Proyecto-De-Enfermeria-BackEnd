import { IsInt, IsNotEmpty, IsString, MinLength, Min, Max, IsOptional } from "class-validator";
import { PreguntaRespondida } from "src/pregunta-respondida/pregunta-respondida.entity";


export class PostPreguntaRequestDTO {

    @IsString()
    @IsNotEmpty({message: "La pregunta no puede estar vacía"})
    @MinLength(5, {message: "La pregunta debe tener al menos 5 caracteres"})
    pregunta: string;

    @IsInt()
    @IsNotEmpty({message: "El puntaje no puede estar vacío"})
    @Min(1, {message: "El puntaje debe ser como mínimo 1"})
    puntaje: number;

    @IsOptional()
    preguntaRespondida:PreguntaRespondida
}