import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { EvaluacionCuestionarioVersionadoModule } from './evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.module';
import { EvaluacionRealizadaModule } from './evaluacion-realizada/evaluacion-realizada.module';
import { DocenteModule } from './docente/docente.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { CuestionarioModule } from './cuestionario/cuestionario.module';

@Module({
  imports: [AlumnoModule, EvaluacionCuestionarioVersionadoModule, EvaluacionRealizadaModule, DocenteModule, EvaluacionModule, CuestionarioModule],
})
export class AppModule {}
