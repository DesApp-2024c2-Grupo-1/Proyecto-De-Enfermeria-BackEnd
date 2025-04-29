import { Module } from '@nestjs/common';
import { TipoEvaluacionController } from './tipo-evaluacion.controller';
import { TipoEvaluacionService } from './tipo-evaluacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEvaluacion } from './tipo-evaluacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEvaluacion])],
  controllers: [TipoEvaluacionController],
  providers: [TipoEvaluacionService],
})
export class TipoEvaluacionModule {}
