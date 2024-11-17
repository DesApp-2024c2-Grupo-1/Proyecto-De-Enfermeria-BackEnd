import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

@Entity()
export class EvaluacionVersionado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: Date;

    @Column()
    version: number;

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.evaluacionVersionado)
    evaluacionRealizada: EvaluacionRealizada[];

    @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.evaluacionVersionado, { nullable: false })
    evaluacion: Evaluacion;
}