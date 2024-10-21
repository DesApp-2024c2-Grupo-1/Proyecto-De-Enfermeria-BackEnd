import { Module } from '@nestjs/common';
import { Alumno } from './alumno/alumno.entity';
import { EvaluacionCuestionarioVersionado } from './evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.entity';
import { EvaluacionRealizada } from './evaluacion-realizada/evaluacion-realizada.entity';
import { Docente } from './docente/docente.entity';
import { Evaluacion } from './evaluacion/evaluacion.entity';
import { Cuestionario } from './cuestionario/cuestionario.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

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
          EvaluacionCuestionarioVersionado, 
          EvaluacionRealizada, 
          Docente, 
          Evaluacion, 
          Cuestionario,
        ],
        autoLoadEntities: true,
        synchronize: true,
      })
    })
  ]
})

export class AppModule {}
