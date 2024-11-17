import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Docente } from "src/docente/docente.entity";
import { Alumno } from "src/alumno/alumno.entity";
import { EvaluacionCuestionarioVersionado } from "src/evaluacion-versionado/evaluacion-cuestionario-versionado.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";

@Entity()
export class EvaluacionRealizada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: Date;

    @ManyToOne(() => Docente, (docente) => docente.evaluacionRealizada, { nullable: false })
    docente: Docente;

    @ManyToOne(() => Alumno, (alumno) => alumno.evaluacionRealizada, { nullable: false })
    alumno: Alumno;

    @ManyToOne(() => EvaluacionVersionado, (evaluacionVersionado) => evaluacionVersionado.evaluacionRealizada)
    evaluacionVersionado: EvaluacionVersionado;

    @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.evaluacionRealizada, { nullable: false })
    evaluacion: Evaluacion;
}