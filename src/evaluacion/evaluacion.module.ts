import { Module } from '@nestjs/common';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionService } from './evaluacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './evaluacion.entity';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { TipoEvaluacion } from 'src/tipo-evaluacion/tipo-evaluacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluacion]),
    TypeOrmModule.forFeature([Pregunta]),
    TypeOrmModule.forFeature([TipoEvaluacion]),
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
})
export class EvaluacionModule {}
