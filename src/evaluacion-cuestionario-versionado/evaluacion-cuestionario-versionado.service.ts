import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../db/data-source';
import { EvaluacionCuestionarioVersionado } from './evaluacion-cuestionario-versionado.entity';

@Injectable()
export class EvaluacionCuestionarioVersionadoService {

    async findAll() {
        const ecvs = await AppDataSource // ecvs significa evaluaciones-cuestionarios-versionados
            .getRepository(EvaluacionCuestionarioVersionado)
            .createQueryBuilder("user")
            .getMany()

        return ecvs
    }

    async findById(id: number) {
        const ecv = await AppDataSource // ecv significa evaluacion-cuestionario-versionado
          .getRepository(EvaluacionCuestionarioVersionado)
          .createQueryBuilder('evaluacion-cuestionario-versionado')
          .where('evaluacion-cuestionario-versionado.id = :id', { id })
          .getOne();
    
        return ecv;
      }
}