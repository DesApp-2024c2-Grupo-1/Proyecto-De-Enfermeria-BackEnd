import { Injectable } from '@nestjs/common';
import { EvaluacionVersionado } from './evaluacion-versionado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionVersionadoService {
  constructor(
    @InjectRepository(EvaluacionVersionado)
    private readonly evaluacionVersionadoRepository: Repository<EvaluacionVersionado>,
  ) {}


    async findAll() { // ecvs=evaluaciones-s-versionados
        const ecvs = await this.evaluacionVersionadoRepository.find({
          select: ['id', 'fecha', 'version'],
      });

        return ecvs
    }

    async findById(id: number) {
        const ecv = await this.evaluacionVersionadoRepository.findOne({
          where: { id },
          select: ['id', 'fecha', 'version'],
        });
    
        return ecv;
      }

    async create(evaluacionVersionadoData: EvaluacionVersionado) {
      const nuevoEvaluacionVersionado = this.evaluacionVersionadoRepository.create(evaluacionVersionadoData);
      return await this.evaluacionVersionadoRepository.save(nuevoEvaluacionVersionado);
        }
  
    async delete(id: number) {
        const salida = await this.evaluacionVersionadoRepository.delete(id);
  
        return salida
      }

      async modifyById(id: number, evData: EvaluacionVersionado) {
        const ev = await this.evaluacionVersionadoRepository.findOne({where: {id}})
      Object.assign(ev, evData)
      this.evaluacionVersionadoRepository.save(ev)
          
      }
}