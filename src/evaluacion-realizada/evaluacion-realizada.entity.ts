import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvaluacionRealizada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nota: number;

    @Column()
    fecha: Date;
}