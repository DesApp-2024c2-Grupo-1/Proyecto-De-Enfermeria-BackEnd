import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../db/data-source';
import { Docente } from './docente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocenteService {
    async findAll() {
      const docentes = await AppDataSource.getRepository(Docente).find({
        select: ['id', 'nombre', 'apellido', 'email', 'dni'],
    });

    return docentes;
    }

    async findById(id: number) {
      const docente = await AppDataSource.getRepository(Docente).findOne({
        where: { id },
        select: ['id', 'nombre', 'apellido', 'email', 'dni'],
      });
      return docente;
    }

    async findByDni(dni: number) {
        const docente = await AppDataSource.getRepository(Docente).findOne({
            where: { dni },
            select: ['id', 'nombre', 'apellido', 'email', 'dni'],
        });
        return docente;
      }

    async create(docenteData: Docente) {
        const nuevoDocente = await AppDataSource
            .getRepository(Docente)
            .create(docenteData)
  
            return AppDataSource
            .getRepository(Docente)
            .save(nuevoDocente)
        }
  
    async delete(id: number) {
        const salida = await AppDataSource
          .getRepository(Docente)
          .createQueryBuilder()
          .delete()
          .from(Docente)
          .where('id = :id', { id })
          .execute()
  
          return salida
      }

      async modifyById(id: number, docenteData: Docente) {
        const docente = await AppDataSource
          .getRepository(Docente)
          .findOneBy({id})
  
  
          Object.assign(docente, docenteData)
  
        const salida = AppDataSource
          .getRepository(Docente)
          .save(docente)
  
  
        return salida
          
      }
      
}
