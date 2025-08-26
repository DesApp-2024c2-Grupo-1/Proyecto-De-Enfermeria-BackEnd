import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      relations: ['password']
    });
    return docente;
  }

  async loginDocente(dni: number, password: string) {
    const docente = await this.docenteRepository.findOne({
      where: { dni },
      select: ['id', 'nombre', 'apellido', 'email'],
      relations: ['password']
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
    const passwordEntity = new Password();
    passwordEntity.password = hashedPassword;
    const savedPassword = await this.passwordRepository.save(passwordEntity);

    const nuevoDocente = await this.docenteRepository.create({
      ...docenteData,
      password: savedPassword,
    });

    return await this.docenteRepository.save(nuevoDocente);
  }

async modifyById(id: number, docenteData: PutDocenteRequestDTO) {
  const docente = await this.docenteRepository.findOne({ where: { id }, relations: [] });

  if (!docente) {
    throw new NotFoundException(`Docente con ID ${id} no encontrado`);
  }

  const camposActualizables = ['nombre', 'apellido'];
  const hayDatos = camposActualizables.some(
    (campo) => docenteData[campo] !== undefined,
  );

  if (!hayDatos) {
    throw new BadRequestException('No se enviaron campos para actualizar');
  }

  docente.modFecha = new Date();

  console.log('Docente a guardar:', docente);
  Object.assign(docente, docenteData);
  return await this.docenteRepository.save(docente);
}
}
