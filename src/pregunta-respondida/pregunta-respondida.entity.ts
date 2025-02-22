import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";


@Entity() 
export class PreguntaRespondida {
    @PrimaryGeneratedColumn()
    id?: Number;

    @Column()
    respuesta: boolean;

    @ManyToOne(() => Pregunta, (pregunta) => pregunta.preguntaRespondida, { nullable: false } )
    pregunta: Pregunta

    @ManyToOne(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.preguntaRespondida, { nullable: false } )
    evaluacionRealizada: EvaluacionRealizada
}
