import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Docente } from "src/docente/docente.entity";

@Entity()
export class EvaluacionRealizada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nota: number;

    @Column()
    fecha: Date;

    @ManyToOne(() => Docente, (docente) => docente.evaluacionRealizada)
    docente: Docente;
}