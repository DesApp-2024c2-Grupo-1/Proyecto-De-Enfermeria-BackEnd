import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { EvaluacionRealizada } from './../evaluacion-realizada/evaluacion-realizada.entity';


@Entity()
export class Alumno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    dni: number;

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.alumno)
    evaluacionRealizada: EvaluacionRealizada[];
}
