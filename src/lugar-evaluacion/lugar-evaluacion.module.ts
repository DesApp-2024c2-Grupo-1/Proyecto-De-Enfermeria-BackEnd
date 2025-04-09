import { Module } from '@nestjs/common';
import { Controller } from './.controller';
import { Service } from './.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarEvaluacion } from './lugar-evaluacion.entity'; 


@Module({
  imports: [TypeOrmModule.forFeature([LugarEvaluacion])],
  controllers: [Controller],
  providers: [Service],
  exports: [TypeOrmModule]
})
export class AlumnoModule {}
