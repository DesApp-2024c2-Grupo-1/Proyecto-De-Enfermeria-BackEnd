import { Module } from '@nestjs/common';
import { PreguntaRespondidaController } from './pregunta-respondida.controller';
import { PreguntaRespondidaService } from './pregunta-respondida.service';

@Module({
  controllers: [PreguntaRespondidaController],
  providers: [PreguntaRespondidaService]
})
export class PreguntaRespondidaModule {}
