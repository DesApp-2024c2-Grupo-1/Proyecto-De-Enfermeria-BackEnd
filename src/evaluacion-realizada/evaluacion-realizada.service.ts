import { Injectable } from '@nestjs/common';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from 'src/alumno/alumno.entity';

@Injectable()
export class EvaluacionRealizadaService {
  constructor(
    @InjectRepository(EvaluacionRealizada)
    private readonly evaluacionRealizadaRepository: Repository<EvaluacionRealizada>,
  ) {}

    async findAll() {
        const evaluacionesRealizadas = await this.evaluacionRealizadaRepository.find({
          select: ['id', 'nota', 'fecha', 'alumno'],
          relations: ['alumno', 'docente', 'evaluacion', 'evaluacionCuestionarioVersionado']
      });

        return evaluacionesRealizadas
    }

    async findById(id: number) {
        const evaluacionRealizada = await this.evaluacionRealizadaRepository.findOne({
          where: { id },
          select: ['id', 'nota', 'fecha'],
        });
    
        return evaluacionRealizada;
      }

      async create(evaluacionRealizadaData: EvaluacionRealizada) {
        const nuevoEvaluacionRealizada = this.evaluacionRealizadaRepository.create(evaluacionRealizadaData);
        return await this.evaluacionRealizadaRepository.save(nuevoEvaluacionRealizada);
        }
  
      async delete(id: number) {
        const salida = await this.evaluacionRealizadaRepository.delete(id);
  
        return salida
      }

      async modifyById(id: number, evaluacionRealizadaData: EvaluacionRealizada) {
        const evaluacionRealizada = await this.evaluacionRealizadaRepository.findOne({where: {id}})
        Object.assign(evaluacionRealizada, evaluacionRealizadaData)
        this.evaluacionRealizadaRepository.save(evaluacionRealizada)
          
      }
}
