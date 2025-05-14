import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { Docente } from 'src/docente/docente.entity';
import { Pregunta } from 'src/pregunta/pregunta.entity';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  titulo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  altaFecha?: Date;

  @Column({ nullable: true })
  bajaFecha?: Date;

  @Column({ nullable: true })
  modFecha?: Date;

  @ManyToOne(() => Docente, (docente) => docente.evaluacion, {
    nullable: false,
  })
  docente: Docente;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.evaluacion)
  preguntas: Pregunta[];

  @OneToMany(
    () => EvaluacionRealizada,
    (evaluacionRealizada) => evaluacionRealizada.evaluacion,
  )
  evaluacionRealizada: EvaluacionRealizada[];
}
