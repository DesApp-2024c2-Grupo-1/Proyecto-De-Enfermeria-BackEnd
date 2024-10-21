import { Module } from '@nestjs/common';
import { EvaluacionCuestionarioVersionadoService } from './evaluacion-cuestionario-versionado.service';
import { EvaluacionCuestionarioVersionadoController } from './evaluacion-cuestionario-versionado.controller';

@Module({
  providers: [EvaluacionCuestionarioVersionadoService],
  controllers: [EvaluacionCuestionarioVersionadoController]
})
export class EvaluacionCuestionarioVersionadoModule {}
