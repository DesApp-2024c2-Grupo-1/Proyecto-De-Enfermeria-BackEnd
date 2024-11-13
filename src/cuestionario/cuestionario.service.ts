import { Injectable } from '@nestjs/common';
import { Cuestionario } from './cuestionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CuestionarioService {
  constructor(
    @InjectRepository(Cuestionario)
    private readonly cuestionarioRepository: Repository<Cuestionario>,
  ) {}

    async findAll() {
      const cuestionarios = await this.cuestionarioRepository.find({
        select: ['id', 'titulo', 'version', 'fecha_version'],
    });

        return cuestionarios
    }

    async findById(id: number) {
      const cuestionario = await this.cuestionarioRepository.findOne({
        where: { id },
        select: ['id', 'titulo', 'version', 'fecha_version'],
      });
    
        return cuestionario;
      }

    async create(cuestionarioData: Cuestionario) {
      const nuevoCuestionario = this.cuestionarioRepository.create(cuestionarioData);
      return await this.cuestionarioRepository.save(nuevoCuestionario);
        }
  
    async delete(id: number) {
      const salida = await this.cuestionarioRepository.delete(id);
      return salida
      }

      async modifyById(id: number, cuestionarioData: Cuestionario) {
        const cuestionario = await this.cuestionarioRepository.findOne({where: {id}})
        Object.assign(cuestionario, cuestionarioData)
        this.cuestionarioRepository.save(cuestionario)    
      }
}
