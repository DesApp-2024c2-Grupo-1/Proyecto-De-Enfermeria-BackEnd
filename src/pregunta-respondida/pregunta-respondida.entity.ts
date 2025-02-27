import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';

@Entity()
export class PreguntaRespondida {
  @PrimaryGeneratedColumn()
  id?: Number;

  @Column({ type: 'boolean' })
  respuesta: boolean;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.preguntaRespondida, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'preguntaId' })
  pregunta: Pregunta;

  @ManyToOne(
    () => EvaluacionRealizada,
    (evaluacionRealizada) => evaluacionRealizada.preguntaRespondida,
    { nullable: false },
  )
  evaluacionRealizada: EvaluacionRealizada;
}
