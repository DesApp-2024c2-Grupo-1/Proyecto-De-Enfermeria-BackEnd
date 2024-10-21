import { Module } from '@nestjs/common';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';
import { EvaluacionRealizadaController } from './evaluacion-realizada.controller';

@Module({
  providers: [EvaluacionRealizadaService],
  controllers: [EvaluacionRealizadaController]
})
export class EvaluacionRealizadaModule {}
