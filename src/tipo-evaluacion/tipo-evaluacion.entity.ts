import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';

@Entity()
export class TipoEvaluacion {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.tipoEvaluacion)
  evaluaciones: Evaluacion[];
}
