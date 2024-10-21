import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';

@Module({
  imports: [AlumnoModule],
})
export class AppModule {}
