import { DataSource } from 'typeorm';
import { Alumno } from '../alumno/alumno.entity';
import { EvaluacionCuestionarioVersionado } from '../evaluacion-cuestionario-versionado/evaluacion-cuestionario-versionado.entity';
import { EvaluacionRealizada } from '../evaluacion-realizada/evaluacion-realizada.entity';
import { Docente } from '../docente/docente.entity';
import { Evaluacion } from '../evaluacion/evaluacion.entity';
import { Cuestionario } from '../cuestionario/cuestionario.entity';
import {  ConfigService, ConfigModule } from '@nestjs/config'

ConfigModule.forRoot();

const configService = new ConfigService() 

export const AppDataSource = new DataSource({
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
        synchronize: true,
  });

  AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });