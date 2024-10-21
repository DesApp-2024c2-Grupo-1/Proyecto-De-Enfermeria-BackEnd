import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Alumno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    mail: string;
}
