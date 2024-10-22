import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Docente } from "src/docente/docente.entity";
import { Alumno } from "src/alumno/alumno.entity";
import { EvaluacionCuestionarioVersionado } from "src/evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

@Entity()
export class EvaluacionRealizada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nota: number;

    @Column()
    fecha: Date;

    @ManyToOne(() => Docente, (docente) => docente.evaluacionRealizada, { nullable: false })
    docente: Docente;

    @ManyToOne(() => Alumno, (alumno) => alumno.evaluacionRealizada, { nullable: false })
    alumno: Alumno;

    @ManyToOne(() => EvaluacionCuestionarioVersionado, (evaluacionCuestionarioVersionado) => evaluacionCuestionarioVersionado.evaluacionRealizada)
    evaluacionCuestionarioVersionado: EvaluacionCuestionarioVersionado;

    @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.evaluacionRealizada, { nullable: false })
    evaluacion: Evaluacion;
}