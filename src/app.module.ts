import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { EvaluacionCuestionarioVersionadoModule } from './evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.module';
import { EvaluacionRealizadaModule } from './evaluacion-realizada/evaluacion-realizada.module';
import { DocenteModule } from './docente/docente.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { CuestionarioModule } from './cuestionario/cuestionario.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AlumnoModule, 
    EvaluacionCuestionarioVersionadoModule, 
    EvaluacionRealizadaModule, 
    DocenteModule, 
    EvaluacionModule, 
    CuestionarioModule,
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
        autoLoadEntities: true,
        synchronize: true,
      })
    })
  ]
})

export class AppModule {}
