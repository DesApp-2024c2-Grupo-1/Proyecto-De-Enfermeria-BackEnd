import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './docente.entity';
import { Password } from 'src/password/password.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Docente, Password]),
  AuthModule
],
  providers: [DocenteService],
  controllers: [DocenteController]
})
export class DocenteModule {}
