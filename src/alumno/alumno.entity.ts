import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EvaluacionRealizada } from './../evaluacion-realizada/evaluacion-realizada.entity';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  dni: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  altaFecha?: Date;

  @Column({ nullable: true })
  bajaFecha?: Date;

  @Column({ nullable: true })
  modFecha?: Date;

  @OneToMany(
    () => EvaluacionRealizada,
    (evaluacionRealizada) => evaluacionRealizada.alumno,
  )
  evaluacionRealizada: EvaluacionRealizada[];
}
