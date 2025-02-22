import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Docente } from "src/docente/docente.entity";
import { Alumno } from "src/alumno/alumno.entity";
import { Evaluacion } from "src/evaluacion/evaluacion.entity";
import { PreguntaRespondida } from "src/pregunta-respondida/pregunta-respondida.entity";

@Entity()
export class EvaluacionRealizada {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    fecha: Date;

    @Column()
    modificacionPuntaje: Number;

    @Column()
    observacion: string;

    @ManyToOne(() => Docente, (docente) => docente.evaluacionRealizada, { nullable: false })
    docente: Docente;

    @ManyToOne(() => Alumno, (alumno) => alumno.evaluacionRealizada, { nullable: false })
    alumno: Alumno;

    @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.evaluacionRealizada, { nullable: false })
    evaluacion: Evaluacion;

    @OneToMany(() => PreguntaRespondida, (preguntaRespondida) => preguntaRespondida.evalaucionRealizada)
    preguntaRespondida: PreguntaRespondida[]
}