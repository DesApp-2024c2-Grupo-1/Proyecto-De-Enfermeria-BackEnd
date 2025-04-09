import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';

@Entity()
export class LugarEvaluacion {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre: string;
 
  @ManyToOne(
    () => EvaluacionRealizada,
    (evaluacionRealizada) => evaluacionRealizada.preguntaRespondida,
    { nullable: false },
  )
  evaluacionRealizada: EvaluacionRealizada;
}
