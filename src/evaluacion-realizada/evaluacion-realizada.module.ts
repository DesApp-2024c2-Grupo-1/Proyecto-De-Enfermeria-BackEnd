import { Module } from '@nestjs/common';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';
import { EvaluacionRealizadaController } from './evaluacion-realizada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { PreguntaRespondida } from 'src/pregunta-respondida/pregunta-respondida.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionRealizada]), TypeOrmModule.forFeature([PreguntaRespondida])],
  providers: [EvaluacionRealizadaService],
  controllers: [EvaluacionRealizadaController]
})
export class EvaluacionRealizadaModule {}
