import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { EvaluacionRealizada } from './../evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';
import { Docente } from 'src/docente/docente.entity';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  modFecha: Date;

  @Column({ nullable: true, default: null })
  bajaFecha: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  altaFecha: Date;

  @OneToOne(() => Docente, (docente) => docente.password)
  docente: Docente;
}
