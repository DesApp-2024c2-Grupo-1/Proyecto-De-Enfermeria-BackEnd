import { IsInt, IsNotEmpty, IsString, MinLength, Min, Max } from "class-validator";


export class PostPreguntaRequestDTO {


    @IsString()
    @IsNotEmpty()
    @MinLength(5, {message: "pregunta debe tener al menos 5 caracteres"})
    pregunta: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    puntaje: number;
}