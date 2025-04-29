import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';

@Entity()
export class TipoEvaluacion {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.tipoEvaluacion, {
    nullable: false,
  })
  evaluacion: Evaluacion;
}
