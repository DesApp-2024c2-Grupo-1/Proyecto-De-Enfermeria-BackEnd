import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { EvaluacionVersionado } from "src/evaluacion-versionado/evaluacion-versionado.entity";
import { Docente } from "src/docente/docente.entity";
import { Pregunta } from "src/pregunta/pregunta.entity";

@Entity()
export class Evaluacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;


    @ManyToOne(() => Docente, (docente) => docente.evaluacion, { nullable: false })
    docente: Docente;

    @OneToMany(() => Pregunta, (pregunta) => pregunta.evaluacion)
    pregunta: Pregunta[]

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.evaluacion)
    evaluacionRealizada: EvaluacionRealizada[];

    @OneToMany(() => EvaluacionVersionado, (evaluacionVersionado) => evaluacionVersionado.evaluacion)
    evaluacionVersionado: EvaluacionVersionado[];

}