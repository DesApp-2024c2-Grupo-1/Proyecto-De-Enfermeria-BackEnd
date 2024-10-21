import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { DocenteModule } from './docente/docente.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { CuestionarioModule } from './cuestionario/cuestionario.module';

@Module({
  imports: [AlumnoModule, DocenteModule, EvaluacionModule, CuestionarioModule],
})
export class AppModule {}
