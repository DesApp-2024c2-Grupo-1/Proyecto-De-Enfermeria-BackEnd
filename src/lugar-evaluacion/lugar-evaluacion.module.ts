import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarEvaluacionController } from './lugar-evaluacion.controller';
import { LugarEvaluacionService } from './lugar-evaluacion.service';
import { LugarEvaluacion } from './lugar-evaluacion.entity'; 


@Module({
  imports: [TypeOrmModule.forFeature([LugarEvaluacion])],
  controllers: [LugarEvaluacionController],
  providers: [LugarEvaluacionService],
  exports: [TypeOrmModule]
})
export class LugarEvaluacionModule {}
