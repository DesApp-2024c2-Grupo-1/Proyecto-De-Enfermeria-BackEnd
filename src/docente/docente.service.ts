import { BadRequestException, Injectable } from '@nestjs/common';
import { Docente } from './docente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) {}

  async findById(id: number) {
    const docente = await this.docenteRepository.findOne({
      where: { id },
      select: ['id', 'nombre', 'apellido', 'email'],
    });
    return docente;
  }

  async loginDocente(dni: number, password: string) {
    const docente = await this.docenteRepository.findOne({
      where: { dni },
      select: ['id', 'nombre', 'apellido', 'email', 'password'],
    });

    if (!docente || !(await bcrypt.compare(password, docente.password))) {
      throw new Error('Credenciales incorrectas');
    }

    const { password: _, ...docenteData } = docente;
    return docenteData;
  }

  async create(docenteData: Docente): Promise<Docente> {
    const { dni, email } = docenteData;
    const existingDocente = await this.docenteRepository.findOne({
      where: [{ dni }, { email }],
    });

    if (existingDocente) {
      throw new BadRequestException(
        existingDocente.dni === dni
          ? 'El DNI ya está en uso'
          : 'El email ya está en uso',
      );
    }

    const hashedPassword = await bcrypt.hash(docenteData.password, 10);
    const nuevoDocente = this.docenteRepository.create({
      ...docenteData,
      password: hashedPassword,
    });

    return await this.docenteRepository.save(nuevoDocente);
  }

  async modifyById(id: number, docenteData: Docente) {
    const docente = await this.docenteRepository.findOne({ where: { id } });
    Object.assign(docente, docenteData);
    this.docenteRepository.save(docente);
  }
}
