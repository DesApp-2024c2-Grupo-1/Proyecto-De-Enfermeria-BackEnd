import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EvaluacionRealizada } from './../evaluacion-realizada/evaluacion-realizada.entity';


@Entity()
export class Alumno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    mail: string;

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.alumno)
    evaluacionRealizada: EvaluacionRealizada[];
}
