import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Docente } from 'src/docente/docente.entity';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  password: string;

  @Column({default: null})
  modFecha?: Date;

  @Column({default: null})
  bajaFecha?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  altaFecha?: Date;

  @OneToOne(() => Docente, (docente) => docente.password)
  docente: Docente;
}
