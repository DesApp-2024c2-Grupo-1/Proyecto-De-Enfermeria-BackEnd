import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { EvaluacionRealizada } from './../evaluacion-realizada/evaluacion-realizada.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';
import { Password } from 'src/password/password.entity'
import { Rol } from 'src/auth/auth.roles.enum';

@Entity()
export class Docente {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre?: string;

  @Column()
  apellido?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ unique: true })
  dni?: number;

  @Column({
    type: 'enum',
    enum: Object.values(Rol),
    default: 'docente',
  })
  rol: Rol

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  altaFecha?: Date;

  @Column({ nullable: true })
  bajaFecha?: Date;

  @Column({ nullable: true })
  modFecha?: Date;

  @OneToMany(
    () => EvaluacionRealizada,
    (evaluacionRealizada) => evaluacionRealizada.docente,
  )
  evaluacionRealizada?: EvaluacionRealizada[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.docente)
  evaluacion?: Evaluacion[];

  @OneToOne(() => Password)
  @JoinColumn()
  password: Password;
}
