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
import { LugarEvaluacion } from 'src/lugar-evaluacion/lugar-evaluacion.entity';
import { PostEvaluacionRealizadaDTO } from './EvaluacionRealizadaDTO/crearEvaluacionRealizada.dto';

@Injectable()
export class EvaluacionRealizadaService {
  constructor(
    @InjectRepository(EvaluacionRealizada)
    private readonly evaluacionRealizadaRepository: Repository<EvaluacionRealizada>,
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(PreguntaRespondida)
    private readonly preguntaRespondidaRepository: Repository<PreguntaRespondida>,
    @InjectRepository(LugarEvaluacion)
    private readonly lugarEvaluacionRepository: Repository<LugarEvaluacion>,
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
      lugarEvaluacion,
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
      const lugarEvaluacionExistente =
        await this.lugarEvaluacionRepository.findOneBy({
          id: Number(lugarEvaluacion),
        });

      if (!alumnoExistente || !docenteExistente || !evaluacionExistente) {
        throw new NotFoundException(
          'Alumno, Docente o Evaluación no encontrados',
        );
      }

      const nuevaEvaluacionRealizada = manager.create(EvaluacionRealizada, {
        alumno: alumnoExistente,
        docente: docenteExistente,
        evaluacion: evaluacionExistente,
        fecha: fecha ? new Date(fecha) : new Date(),
        observacion: observacion,
        modificacionPuntaje: modificacionPuntaje,
        lugarEvaluacion: lugarEvaluacionExistente,
      });

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
            respuesta: preguntaRespondida[index].respuesta,
            pregunta: { id: pregunta.id },
            evaluacionRealizada: nuevaEvaluacionRealizada,
          });
        },
      );

      await manager.save(preguntasRespondidas);

      return { message: 'Evaluación realizada registrada con éxito' };
    });
  }

  async findById(id: number) {
    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({
        where: { id },
        select: [
          'id',
          'fecha',
          'preguntaRespondida',
          'modificacionPuntaje',
          'observacion',
        ],

        relations: [
          'alumno',
          'docente',
          'preguntaRespondida',
          'preguntaRespondida.pregunta',
          'lugarEvaluacion',
        ],

        order: {
          preguntaRespondida: {
            pregunta: {
              orden: 'ASC',
            }
          }
        }
      });

    const nota = await this.calcularNota(evaluacionRealizada.id);

    return {
      id: evaluacionRealizada.id,
      fecha: formatearFecha(evaluacionRealizada.fecha),
      alumno: {
        nombre: evaluacionRealizada.alumno.nombre,
        apellido: evaluacionRealizada.alumno.apellido,
        dni: evaluacionRealizada.alumno.dni,
      },
      docente: {
        nombre: evaluacionRealizada.docente.nombre,
        apellido: evaluacionRealizada.docente.apellido,
      },
      preguntaRespondida: evaluacionRealizada.preguntaRespondida.map((pr) => ({
        respuesta: pr.respuesta,
        pregunta: pr.pregunta.pregunta,
        puntaje: pr.pregunta.puntaje,
      })),
      modificacionPuntaje: evaluacionRealizada.modificacionPuntaje,
      observacion: evaluacionRealizada.observacion,
      lugarEvaluacion: {
        id: evaluacionRealizada.lugarEvaluacion.id,
        nombre: evaluacionRealizada.lugarEvaluacion.nombre,
      },
      nota,
    };
  }

  async findAllEvaluacionesDeUnAlumno(evaluacionId: number, alumnoId: number) {
    const evaluacionesDeUnAlumno =
      await this.evaluacionRealizadaRepository.find({
        select: ['id', 'fecha'],
        where: { alumno: { id: alumnoId }, evaluacion: { id: evaluacionId } },
        relations: ['alumno', 'evaluacion'],
      });

    const agregarNota = async (evaluacion: EvaluacionRealizada) => {
      const nota = await this.calcularNota(evaluacion.id);
      return {
        ...evaluacion,
        fecha: formatearFecha(evaluacion.fecha),
        nota,
      };
    };

    return Promise.all(evaluacionesDeUnAlumno.map(agregarNota));
  }

  async findAllEvaluacionesPorAlumno(alumnoId: number) {
    const evaluacionesDeUnAlumno =
      await this.evaluacionRealizadaRepository.find({
        select: ['id', 'fecha'],
        where: { alumno: { id: alumnoId } },
        relations: ['evaluacion'],
      });

    const agregarNota = async (evaluacion: EvaluacionRealizada) => {
      const nota = await this.calcularNota(evaluacion.id);
      return {
        ...evaluacion,
        fecha: formatearFecha(evaluacion.fecha),
        nota,
      };
    };

    return Promise.all(evaluacionesDeUnAlumno.map(agregarNota));
  }

  async findAllAlumnosPorEvaluacion(evaluacionId: number) {
    const modeloBase = await this.evaluacionRepository.findOne({
      where: { id: evaluacionId },
    });
    const tituloModeloBase = modeloBase.titulo;

    const evaluacionesRealizadas =
      await this.evaluacionRealizadaRepository.find({
        select: ['id', 'fecha'],
        where: { evaluacion: { titulo: tituloModeloBase } },
        relations: ['alumno'],
      });

    const alumnosMap = new Map<
      number,
      {
        alumnoId: number;
        nombre: string;
        apellido: string;
        dni: number;
        evaluacionesRealizadas: { id: number; fecha: string; nota: string }[];
      }
    >();

    for (const evalRealizada of evaluacionesRealizadas) {
      const alumno = evalRealizada.alumno;

      if (!alumnosMap.has(alumno.id)) {
        alumnosMap.set(alumno.id, {
          alumnoId: alumno.id,
          nombre: alumno.nombre,
          apellido: alumno.apellido,
          dni: alumno.dni,
          evaluacionesRealizadas: [],
        });
      }

      alumnosMap.get(alumno.id).evaluacionesRealizadas.push({
        id: evalRealizada.id,
        fecha: formatearFecha(evalRealizada.fecha),
        nota: await this.calcularNota(evalRealizada.id),
      });
    }

    return Array.from(alumnosMap.values());
  }

  // Para el dropdown
  async findEvaluacionesDeUnAlumno(evaluacionId: number) {
    const evaluacionesRealizadas =
      await this.evaluacionRealizadaRepository.find({
        select: ['id', 'fecha'],
        where: { evaluacion: { id: evaluacionId } },
        relations: ['evaluacion', 'alumno'],
      });

    if (evaluacionesRealizadas.length === 0) {
      throw new Error(
        `No se encontraron evaluaciones para el alumno con ID ${evaluacionId}`,
      );
    }

    const { nombre, apellido, dni } = evaluacionesRealizadas[0].alumno;

    const evaluaciones = await Promise.all(
      evaluacionesRealizadas.map(async (er) => ({
        id: er.id,
        nombre: er.evaluacion.titulo,
        fecha: formatearFecha(er.fecha),
        nota: await this.calcularNota(er.id),
      })),
    );

    return {
      nombre,
      apellido,
      dni,
      evaluaciones,
    };
  }

  async calcularNota(evaluacionRealizadaId: number): Promise<string> {
    const preguntasRespondidas = await this.preguntaRespondidaRepository.find({
      where: { evaluacionRealizada: { id: evaluacionRealizadaId } },
      relations: ['pregunta'],
    });

    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({
        where: { id: evaluacionRealizadaId },
      });

    const puntajeMaximo = preguntasRespondidas.reduce(
      (total, preguntaRespondida) => {
        return total + preguntaRespondida.pregunta.puntaje;
      },
      0,
    );

    const puntajeObtenido = preguntasRespondidas.reduce(
      (total, preguntaRespondida) => {
        return preguntaRespondida.respuesta
          ? total + preguntaRespondida.pregunta.puntaje
          : total;
      },
      0,
    );

    const nota = Math.min(
      100,
      ((puntajeObtenido + evaluacionRealizada.modificacionPuntaje) /
        puntajeMaximo) *
        100,
    );

    return `${Math.round(nota)}%`;
  }
}

function formatearFecha(fechaString) {
  const fecha = new Date(fechaString);
  return new Intl.DateTimeFormat('es-AR').format(fecha);
}
