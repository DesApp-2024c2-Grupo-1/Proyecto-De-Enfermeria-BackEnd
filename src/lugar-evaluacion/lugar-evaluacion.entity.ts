import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EvaluacionRealizada } from 'src/evaluacion-realizada/evaluacion-realizada.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class LugarEvaluacion {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre: string;
 
  @OneToMany(
    () => EvaluacionRealizada,
    (evaluacionRealizada) => evaluacionRealizada.lugarEvaluacion,
    { nullable: false },
  )
  evaluacionRealizada: EvaluacionRealizada;
}
