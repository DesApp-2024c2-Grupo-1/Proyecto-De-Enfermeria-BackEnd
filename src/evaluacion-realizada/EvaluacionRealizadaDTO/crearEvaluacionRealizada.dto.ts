import { IsString, MinLength, IsInt, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested } from "class-validator"
import { Type } from "class-transformer";
import { PostDocenteRequestDTO } from "src/docente/DocenteDTO/crearDocente.dto";
import { PostAlumnoRequestDTO } from "src/alumno/AlumnoDTO/crearAlumno.dto";
import { PostPreguntaRespondidaRequestDTO } from "src/pregunta-respondida/PreguntaRespondidaDTO/crearPreguntaRespondida.dto";

export class PostEvaluacionRealizadaDTO {
    
    @IsString()
    @MinLength(5)
    observacion: string

    @IsInt()
    modificacionPuntaje: Number

    @IsNotEmpty()
    @Type()
    docente: PostDocenteRequestDTO

    @IsNotEmpty()
    @Type()
    alumno: PostAlumnoRequestDTO

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type()
    preguntaRespondida: PostPreguntaRespondidaRequestDTO[]
}