import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../db/data-source';
import { EvaluacionCuestionarioVersionado } from './evaluacion-cuestionario-versionado.entity';

@Injectable()
export class EvaluacionCuestionarioVersionadoService {

    async findAll() {
        const ecvs = await AppDataSource // ecvs significa evaluaciones-cuestionarios-versionados
            .getRepository(EvaluacionCuestionarioVersionado)
            .createQueryBuilder('evaluacion-cuestionario-versionado')
            .leftJoinAndSelect('evaluacion-cuestionario-versionado.evaluacion', 'evaluacion')
            .leftJoinAndSelect('evaluacion-cuestionario-versionado.cuestionario', 'cuestionario')
            .getMany()

        return ecvs
    }

    async findById(id: number) {
        const ecv = await AppDataSource // ecv significa evaluacion-cuestionario-versionado
          .getRepository(EvaluacionCuestionarioVersionado)
          .createQueryBuilder('evaluacion-cuestionario-versionado')
          .leftJoinAndSelect('evaluacion-cuestionario-versionado.evaluacion', 'evaluacion')
          .leftJoinAndSelect('evaluacion-cuestionario-versionado.cuestionario', 'cuestionario')
          .where('evaluacion-cuestionario-versionado.id = :id', { id })
          .getOne();
    
        return ecv;
      }

    async create(evaluacionCuestionarioVersionadoData: EvaluacionCuestionarioVersionado) {
        const nuevoEvaluacionCuestionarioVersionado = await AppDataSource
            .getRepository(EvaluacionCuestionarioVersionado)
            .create(evaluacionCuestionarioVersionadoData)
  
            return AppDataSource
            .getRepository(EvaluacionCuestionarioVersionado)
            .save(nuevoEvaluacionCuestionarioVersionado)
        }
  
    async delete(id: number) {
        const salida = await AppDataSource
          .getRepository(EvaluacionCuestionarioVersionado)
          .createQueryBuilder()
          .delete()
          .from(EvaluacionCuestionarioVersionado)
          .where('id = :id', { id })
          .execute()
  
          return salida
      }
      async modifyById(id: number, ecvData: EvaluacionCuestionarioVersionado) {
        const ecv = await AppDataSource
          .getRepository(EvaluacionCuestionarioVersionado)
          .findOneBy({id})
  
  
          Object.assign(ecv, ecvData)
  
        const salida = AppDataSource
          .getRepository(EvaluacionCuestionarioVersionado)
          .save(ecv)
  
  
        return salida
          
      }
}