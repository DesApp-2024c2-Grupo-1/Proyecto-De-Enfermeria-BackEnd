import { Module } from '@nestjs/common';
import { EvaluacionRealizadaService } from './evaluacion-realizada.service';
import { EvaluacionRealizadaController } from './evaluacion-realizada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionRealizada])],
  providers: [EvaluacionRealizadaService],
  controllers: [EvaluacionRealizadaController]
})
export class EvaluacionRealizadaModule {}
