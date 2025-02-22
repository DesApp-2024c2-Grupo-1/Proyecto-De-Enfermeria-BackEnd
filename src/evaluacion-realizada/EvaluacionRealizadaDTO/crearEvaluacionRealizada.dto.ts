import { IsString, MinLength, IsInt, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested } from "class-validator"
import { Type } from "class-transformer";
import { PostDocenteRequestDTO } from "src/docente/DocenteDTO/crearDocente.dto";
import { PostAlumnoRequestDTO } from "src/alumno/AlumnoDTO/crearAlumno.dto";
import { PostPreguntaRespondidaRequestDTO } from "src/pregunta-respondida/PreguntaRespondidaDTO/crearPreguntaRespondida.dto";
import { PostEvaluacionRequestDTO } from "src/evaluacion/EvaluacionDTO/crearEvaluacion.dto";

export class PostEvaluacionRealizadaDTO {
    
    @IsString()
    @MinLength(5)
    observacion: string

    @IsInt()
    modificacionPuntaje: Number

    fecha: Date

    @IsNotEmpty()
    @Type(() => PostDocenteRequestDTO)
    docente: PostDocenteRequestDTO

    @IsNotEmpty()
    @Type(() => PostAlumnoRequestDTO)
    alumno: PostAlumnoRequestDTO

    @IsNotEmpty()
    @Type(() => PostEvaluacionRequestDTO)
    evaluacion: PostEvaluacionRequestDTO

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => PostPreguntaRespondidaRequestDTO)
    preguntaRespondida: PostPreguntaRespondidaRequestDTO[]
}