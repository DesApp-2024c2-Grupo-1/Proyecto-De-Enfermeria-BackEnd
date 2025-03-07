import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EvaluacionRealizada } from './evaluacion-realizada.entity';
import { PreguntaRespondida } from 'src/pregunta-respondida/pregunta-respondida.entity';
import { Alumno } from 'src/alumno/alumno.entity';
import { Docente } from 'src/docente/docente.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity';
import { PostEvaluacionRealizadaDTO } from './EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';

@Injectable()
export class EvaluacionRealizadaService {
  constructor(
    @InjectRepository(EvaluacionRealizada)
    private readonly evaluacionRealizadaRepository: Repository<EvaluacionRealizada>,
    @InjectRepository(PreguntaRespondida)
    private readonly preguntaRespondidaRepository: Repository<PreguntaRespondida>,
    private readonly dataSource: DataSource,
  ) {}

  async crearEvaluacionRealizada(data: PostEvaluacionRealizadaDTO) {
    const {
      alumno,
      docente,
      evaluacion,
      preguntaRespondida,
      fecha,
      observacion,
      modificacionPuntaje,
      lugarPractica,
    } = data;

    return await this.dataSource.transaction(async (manager) => {
      const alumnoExistente = await manager.findOne(Alumno, {
        where: { id: alumno.id },
      });
      const docenteExistente = await manager.findOne(Docente, {
        where: { id: docente.id },
      });
      const evaluacionExistente = await manager.findOne(Evaluacion, {
        where: { id: evaluacion.id },
        relations: ['preguntas'],
      });

      if (!alumnoExistente || !docenteExistente || !evaluacionExistente) {
        throw new NotFoundException(
          'Alumno, Docente o Evaluación no encontrados',
        );
      }

      /*
      if (preguntaRespondida.length !== evaluacionExistente.preguntas.length) {
        throw new BadRequestException(
          'La cantidad de respuestas no coincide con la cantidad de preguntas',
        );
      }
        */

      const nuevaEvaluacionRealizada = manager.create(EvaluacionRealizada, {
        alumno: alumnoExistente,
        docente: docenteExistente,
        evaluacion: evaluacionExistente,
        fecha: fecha ? new Date(fecha) : new Date(),
        observacion: observacion,
        modificacionPuntaje: modificacionPuntaje,
        lugarPractica: lugarPractica,
      });

      console.log(observacion);

      await manager.save(nuevaEvaluacionRealizada);

      // Crear Preguntas Respondidas
      const preguntasRespondidas = evaluacionExistente.preguntas.map(
        (pregunta, index) => {
          if (!preguntaRespondida[index]) {
            throw new BadRequestException(
              `No se encontró una respuesta para la pregunta en la posición ${index}`,
            );
          }

          return manager.create(PreguntaRespondida, {
            respuesta: Boolean(preguntaRespondida[index]),
            pregunta: { id: pregunta.id },
            evaluacionRealizada: nuevaEvaluacionRealizada,
          });
        },
      );

      await manager.save(preguntasRespondidas);

      return { message: 'Evaluación realizada registrada con éxito' };
    });
  }

  async findAll() {
    const evaluacionesRealizadas =
      await this.evaluacionRealizadaRepository.find({
        select: ['id', 'fecha'],
        relations: [
          'alumno',
          'docente',
          'evaluacion',
          'preguntaRespondida',
          'preguntaRespondida.pregunta',
        ],
      });

    return evaluacionesRealizadas;
  }

  async findById(id: number) {
    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({
        where: { id },
        select: ['id', 'fecha'],
      });

    return evaluacionRealizada;
  }

  async delete(id: number) {
    const salida = await this.evaluacionRealizadaRepository.delete(id);

    return salida;
  }

  async modifyById(id: number, evaluacionRealizadaData: EvaluacionRealizada) {
    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({ where: { id } });
    Object.assign(evaluacionRealizada, evaluacionRealizadaData);
    this.evaluacionRealizadaRepository.save(evaluacionRealizada);
  }
}
