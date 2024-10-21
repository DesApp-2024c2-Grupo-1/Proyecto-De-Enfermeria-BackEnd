import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}