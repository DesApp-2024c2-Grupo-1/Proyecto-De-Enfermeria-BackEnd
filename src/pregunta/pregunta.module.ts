import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './pregunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta])],
  providers: [PreguntaService],
  controllers: [PreguntaController]
})
export class PreguntaModule {}
