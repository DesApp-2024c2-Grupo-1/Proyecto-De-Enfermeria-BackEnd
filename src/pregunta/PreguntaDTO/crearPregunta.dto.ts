import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


export class PostPreguntaRequestDTO {


    @IsString()
    @IsNotEmpty()
    @MinLength(5, {message: "pregunta debe tener al menos 5 caracteres"})
    pregunta: string;

    @IsInt()
    @IsNotEmpty()
    puntaje: number;
}