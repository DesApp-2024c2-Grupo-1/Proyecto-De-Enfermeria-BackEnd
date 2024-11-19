import { Injectable } from '@nestjs/common';
import { Docente } from './docente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) {}

  async findAll() {
    const docentes = await this.docenteRepository.find({
      select: ['id', 'nombre', 'apellido', 'email', 'dni'],
    });

    return docentes;
  }

  async findById(id: number) {
    const docente = await this.docenteRepository.findOne({
      where: { id },
      select: ['id', 'nombre', 'apellido'],
    });
    return docente;
  }

  async findByDni(dni: number) {
    const docente = await this.docenteRepository.findOne({
      where: { dni },
      select: ['id', 'nombre', 'apellido'],
    });
    return docente;
  }

  async findByEmail(email: string) {
    const docente = await this.docenteRepository.findOne({
      where: { email },
      select: ['id', 'nombre', 'apellido']
    })
  }

  async create(docenteData: Docente) {
    const nuevoDocente = this.docenteRepository.create(docenteData);
    return await this.docenteRepository.save(nuevoDocente);
  }

  async delete(id: number) {
    const result = await this.docenteRepository.delete(id);
    return result;
  }

  async modifyById(id: number, docenteData: Docente) {
    const docente = await this.docenteRepository.findOne({ where: { id } });
    Object.assign(docente, docenteData);
    this.docenteRepository.save(docente);
  }
}
