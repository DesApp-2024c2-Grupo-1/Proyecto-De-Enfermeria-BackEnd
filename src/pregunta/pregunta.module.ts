import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';

@Module({
  providers: [PreguntaService],
  controllers: [PreguntaController]
})
export class PreguntaModule {}
