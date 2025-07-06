import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';
import { PreguntaRespondida } from 'src/pregunta-respondida/pregunta-respondida.entity';

@Entity()
export class Pregunta {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  pregunta: string;

  @Column()
  puntaje: number;

  @Column()
  orden: number;

  @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.preguntas, {
    nullable: false,
  })
  evaluacion: Evaluacion;

  @OneToMany(
    () => PreguntaRespondida,
    (preguntaRespondida) => preguntaRespondida.pregunta,
  )
  preguntaRespondida: PreguntaRespondida[];
}
