import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}