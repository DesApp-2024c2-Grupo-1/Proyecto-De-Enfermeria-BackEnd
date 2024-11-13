import { Injectable } from '@nestjs/common';
import { EvaluacionCuestionarioVersionado } from './evaluacion-cuestionario-versionado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionCuestionarioVersionadoService {
  constructor(
    @InjectRepository(EvaluacionCuestionarioVersionado)
    private readonly evaluacionCuestionarioVersionadoRepository: Repository<EvaluacionCuestionarioVersionado>,
  ) {}


    async findAll() { // ecvs=evaluaciones-cuestionarios-versionados
        const ecvs = await this.evaluacionCuestionarioVersionadoRepository.find({
          select: ['id', 'fecha', 'version'],
      });

        return ecvs
    }

    async findById(id: number) {
        const ecv = await this.evaluacionCuestionarioVersionadoRepository.findOne({
          where: { id },
          select: ['id', 'fecha', 'version'],
        });
    
        return ecv;
      }

    async create(evaluacionCuestionarioVersionadoData: EvaluacionCuestionarioVersionado) {
      const nuevoEvaluacionCuestionarioVersionado = this.evaluacionCuestionarioVersionadoRepository.create(evaluacionCuestionarioVersionadoData);
      return await this.evaluacionCuestionarioVersionadoRepository.save(nuevoEvaluacionCuestionarioVersionado);
        }
  
    async delete(id: number) {
        const salida = await this.evaluacionCuestionarioVersionadoRepository.delete(id);
  
        return salida
      }

      async modifyById(id: number, ecvData: EvaluacionCuestionarioVersionado) {
        const ecv = await this.evaluacionCuestionarioVersionadoRepository.findOne({where: {id}})
      Object.assign(ecv, ecvData)
      this.evaluacionCuestionarioVersionadoRepository.save(ecv)
          
      }
}