import { IsInt, IsNotEmpty, IsString, MinLength, Min, Max } from "class-validator";


export class PostPreguntaRequestDTO {


    @IsString()
    @IsNotEmpty({message: "pregunta no puede estar vacio"})
    @MinLength(5, {message: "pregunta debe tener al menos 5 caracteres"})
    pregunta: string;

    @IsInt()
    @IsNotEmpty({message: "puntaje no puede estar vacio"})
    @Min(1, {message: "puntaje debe ser como minimo 1"})
    puntaje: number;
}