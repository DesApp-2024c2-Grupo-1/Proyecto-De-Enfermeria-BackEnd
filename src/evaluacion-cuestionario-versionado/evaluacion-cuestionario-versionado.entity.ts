import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";
import { Cuestionario } from "src/cuestionario/cuestionario.entity";

@Entity()
export class EvaluacionCuestionarioVersionado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: Date;

    @Column()
    version: number;

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.evaluacionCuestionarioVersionado)
    evaluacionRealizada: EvaluacionRealizada[];

    @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.evaluacionCuestionarioVersionado, { nullable: false })
    evaluacion: Evaluacion;

    @ManyToOne(() => Cuestionario, (cuestionario) => cuestionario.evaluacionCuestionarioVersionado, { nullable: false })
    cuestionario: Cuestionario;
}