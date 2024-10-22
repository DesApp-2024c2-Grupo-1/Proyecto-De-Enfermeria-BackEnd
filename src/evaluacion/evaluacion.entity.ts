import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { EvaluacionRealizada } from "src/evaluacion-realizada/evaluacion-realizada.entity";
import { EvaluacionCuestionarioVersionado } from "src/evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.entity";
import { Cuestionario } from "src/cuestionario/cuestionario.entity";

@Entity()
export class Evaluacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    exigencia: string;

    @Column()
    cantidadDePreguntas: number;

    @Column()
    puntajeIdeal: number;

    @OneToMany(() => EvaluacionRealizada, (evaluacionRealizada) => evaluacionRealizada.evaluacion)
    evaluacionRealizada: EvaluacionRealizada[];

    @OneToMany(() => EvaluacionCuestionarioVersionado, (evaluacionCuestionarioVersionado) => evaluacionCuestionarioVersionado.evaluacion)
    evaluacionCuestionarioVersionado: EvaluacionCuestionarioVersionado[];

    @OneToOne(() => Cuestionario, { nullable: false })
    @JoinColumn()
    cuestionario: Cuestionario;
}