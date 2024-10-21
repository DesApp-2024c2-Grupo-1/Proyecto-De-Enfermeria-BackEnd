import { Module } from '@nestjs/common';
import { CuestionarioController } from './cuestionario.controller';
import { CuestionarioService } from './cuestionario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuestionario } from './cuestionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuestionario])],
  controllers: [CuestionarioController],
  providers: [CuestionarioService]
})
export class CuestionarioModule {}
