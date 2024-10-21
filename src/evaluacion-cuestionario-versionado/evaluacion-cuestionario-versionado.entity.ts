import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvaluacionCuestionarioVersionado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: Date;

    @Column()
    version: number;
}