import { Module } from '@nestjs/common';
import { EvaluacionCuestionarioVersionadoService } from './evaluacion-cuestionario-versionado.service';
import { EvaluacionCuestionarioVersionadoController } from './evaluacion-cuestionario-versionado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionCuestionarioVersionado } from './evaluacion-cuestionario-versionado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionCuestionarioVersionado])],
  providers: [EvaluacionCuestionarioVersionadoService],
  controllers: [EvaluacionCuestionarioVersionadoController]
})
export class EvaluacionCuestionarioVersionadoModule {}
