import { BadRequestException, Injectable } from '@nestjs/common';
import { Docente } from './docente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { PostDocenteRequestDTO } from './DocenteDTO/crearDocente.dto';
import { Password } from 'src/password/password.entity';
import { PutDocenteRequestDTO } from './DocenteDTO/putDocente.dto';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,
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

    if (!docente || !(await bcrypt.compare(password, docente.password.password))) {
      throw new Error('Credenciales incorrectas');
    }

    const { password: _, ...docenteData } = docente;
    return docenteData;
  }

  async create(docenteData: PostDocenteRequestDTO): Promise<Docente> {
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
    const pass = await this.passwordRepository.create({
      password: hashedPassword
    })

    const nuevoDocente = await this.docenteRepository.create({
      ...docenteData,
      password: pass,
    });

    return await this.docenteRepository.save(nuevoDocente);
  }

  async modifyById(id: number, docenteData: PutDocenteRequestDTO) {
    const docente = await this.docenteRepository.findOne({ where: { id } });
    Object.assign(docente, docenteData);
    this.docenteRepository.save(docente);
  }
}
