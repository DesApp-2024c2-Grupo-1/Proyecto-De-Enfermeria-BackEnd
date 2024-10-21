import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Docente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    mail: string;

    @Column()
    dni: number;
}