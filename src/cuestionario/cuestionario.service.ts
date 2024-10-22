import { Injectable } from '@nestjs/common';
import { Cuestionario } from './cuestionario.entity';
import { AppDataSource } from '../db/data-source';

@Injectable()
export class CuestionarioService {

    async findAll() {
        const cuestionarios = await AppDataSource
            .getRepository(Cuestionario)
            .createQueryBuilder("user")
            .getMany()

        return cuestionarios
    }

    async findById(id: number) {
        const cuestionario = await AppDataSource
          .getRepository(Cuestionario)
          .createQueryBuilder('cuestionario')
          .where('cuestionario.id = :id', { id })
          .getOne();
    
        return cuestionario;
      }

    async create(cuestionarioData: Cuestionario) {
        const nuevoCuestionario = await AppDataSource
            .getRepository(Cuestionario)
            .create(cuestionarioData)
  
            return AppDataSource
            .getRepository(Cuestionario)
            .save(cuestionarioData)
        }
  
    async delete(id: number) {
        const salida = await AppDataSource
          .getRepository(Cuestionario)
          .createQueryBuilder()
          .delete()
          .from(Cuestionario)
          .where('id = :id', { id })
          .execute()
  
          return salida
      }
}
