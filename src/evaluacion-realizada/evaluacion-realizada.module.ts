import { Module } from '@nestjs/common';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';
import { EvaluacionRealizadaController } from './evaluacion-realizada.controller';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { PreguntaRespondida } from 'src/pregunta-respondida/pregunta-respondida.entity';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { Alumno } from 'src/alumno/alumno.entity';
import { LugarEvaluacion } from 'src/lugar-evaluacion/lugar-evaluacion.entity'


@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionRealizada, Pregunta, PreguntaRespondida, Alumno, Evaluacion, LugarEvaluacion])],
  providers: [EvaluacionRealizadaService],
  controllers: [EvaluacionRealizadaController]
})
export class EvaluacionRealizadaModule {}
