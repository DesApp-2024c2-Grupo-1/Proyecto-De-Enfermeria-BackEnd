import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { EvaluacionCuestionarioVersionado } from "src/evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

@Entity()
export class Cuestionario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    version: number;

    @Column()
    fecha_version: Date; // ???

    @OneToMany(() => EvaluacionCuestionarioVersionado, (evaluacionCuestionarioVersionado) => evaluacionCuestionarioVersionado.cuestionario)
    evaluacionCuestionarioVersionado: EvaluacionCuestionarioVersionado[];

    @OneToOne(() => Evaluacion, evaluacion => evaluacion.cuestionario)
    evaluacion: Evaluacion;
}