import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entidades
import { Alumno } from './alumno/alumno.entity';
import { EvaluacionRealizada } from './evaluacion-realizada/evaluacion-realizada.entity';
import { Docente } from './docente/docente.entity';
import { Evaluacion } from './evaluacion/evaluacion.entity';
import { Pregunta } from './pregunta/pregunta.entity';
import { PreguntaRespondida } from './pregunta-respondida/pregunta-respondida.entity';

// Modulos
import { AlumnoModule } from './alumno/alumno.module';
import { EvaluacionRealizadaModule } from './evaluacion-realizada/evaluacion-realizada.module';
import { DocenteModule } from './docente/docente.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { PreguntaRespondidaModule } from './pregunta-respondida/pregunta-respondida.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Alumno,
          EvaluacionRealizada,
          Docente,
          Evaluacion,
          Pregunta,
          PreguntaRespondida,
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AlumnoModule,
    EvaluacionRealizadaModule,
    DocenteModule,
    EvaluacionModule,
    PreguntaModule,
    PreguntaRespondidaModule,
  ],
})
export class AppModule {}
