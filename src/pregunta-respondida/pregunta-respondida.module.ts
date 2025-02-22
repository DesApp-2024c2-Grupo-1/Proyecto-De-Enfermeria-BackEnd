import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaRespondidaController } from './pregunta-respondida.controller';
import { PreguntaRespondidaService } from './pregunta-respondida.service';
import { PreguntaRespondida } from './pregunta-respondida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreguntaRespondida])],
controllers: [PreguntaRespondidaController],
  providers: [PreguntaRespondidaService]
})
export class PreguntaRespondidaModule {}
