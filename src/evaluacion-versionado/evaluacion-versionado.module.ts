import { Module } from '@nestjs/common';
import { EvaluacionVersionadoService } from './evaluacion-versionado.service';
import { EvaluacionVersionadoController } from './evaluacion-versionado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionVersionado } from './evaluacion-versionado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionVersionado])],
  providers: [EvaluacionVersionadoService],
  controllers: [EvaluacionVersionadoController]
})
export class EvaluacionVersionadoModule {}
