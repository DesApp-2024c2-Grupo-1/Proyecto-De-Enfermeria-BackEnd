import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EvaluacionRealizada } from './../evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

@Entity()
export class Docente {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    dni: number;

    @Column()
    password: string;

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.docente)
    evaluacionRealizada?: EvaluacionRealizada[];

    @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.docente)
    evaluacion?: Evaluacion[];

}