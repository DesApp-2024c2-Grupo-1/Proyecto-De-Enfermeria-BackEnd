import { Module } from '@nestjs/common';
import { CuestionarioController } from './cuestionario.controller';
import { CuestionarioService } from './cuestionario.service';

@Module({
  controllers: [CuestionarioController],
  providers: [CuestionarioService]
})
export class CuestionarioModule {}
