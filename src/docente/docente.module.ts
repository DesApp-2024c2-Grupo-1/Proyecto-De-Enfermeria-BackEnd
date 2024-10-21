import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  providers: [DocenteService],
  controllers: [DocenteController]
})
export class DocenteModule {}
