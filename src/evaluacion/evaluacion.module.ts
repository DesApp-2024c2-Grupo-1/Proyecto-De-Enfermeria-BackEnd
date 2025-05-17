import { Module } from '@nestjs/common';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionService } from './evaluacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './evaluacion.entity';
import { Pregunta } from 'src/pregunta/pregunta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluacion]),
    TypeOrmModule.forFeature([Pregunta]),
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
})
export class EvaluacionModule {}
