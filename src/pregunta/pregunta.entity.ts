import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

@Entity()
export class Pregunta {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    pregunta: string;

    @Column()
    puntaje: number;

    @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.pregunta, { nullable: false })
    evaluacion: Evaluacion;

}