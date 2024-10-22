import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EvaluacionRealizada } from './../evaluacion-realizada/evaluacion-realizada.entity';

@Entity()
export class Docente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    mail: string;

    @Column()
    dni: number;

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.docente)
    evaluacionRealizada: EvaluacionRealizada[];
}