import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { EvaluacionCuestionarioVersionadoModule } from './evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.module';
import { EvaluacionRealizadaModule } from './evaluacion-realizada/evaluacion-realizada.module';

@Module({
  imports: [AlumnoModule, EvaluacionCuestionarioVersionadoModule, EvaluacionRealizadaModule],
})
export class AppModule {}
