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
import { min } from 'class-validator';

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

  async findAll() {
    const evaluacionesRealizadas =
      await this.evaluacionRealizadaRepository.find({
        select: ['id', 'fecha'],
      });

    const agregarNotaYFechaFormateada = async (
      evaluacion: EvaluacionRealizada,
    ) => {
      const nota = await this.calcularNota(evaluacion.id);
      return {
        ...evaluacion,
        fecha: evaluacion.fecha.toISOString().split('T')[0],
        nota,
      };
    };

    return Promise.all(evaluacionesRealizadas.map(agregarNotaYFechaFormateada));
  }

  async findEvaluacionDeAlumno(idEvaluacion: number, alumnoId: number) {
    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({
        where: { id: idEvaluacion, alumno: { id:alumnoId } },
        select: ['id', 'fecha'],
        relations: [
          'alumno',
          'docente',
          'preguntaRespondida',
          'preguntaRespondida.pregunta',
        ],
      });

    const nota = await this.calcularNota(evaluacionRealizada.id);

    return {
      id: evaluacionRealizada.id,
      fecha: evaluacionRealizada.fecha.toISOString().split('T')[0],
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
        puntaje: pr.pregunta.puntaje
      })),
      modificacionPuntaje: evaluacionRealizada.modificacionPuntaje,
      observacion: evaluacionRealizada.observacion,
      nota,
    };
  }

  async findById(id: number) {
    const evaluacionRealizada =
      await this.evaluacionRealizadaRepository.findOne({
        where: { id },
        select: ['id', 'fecha'],
        relations: [
          'alumno',
          'docente',
          'preguntaRespondida',
          'preguntaRespondida.pregunta',
        ],
      });

    const nota = await this.calcularNota(evaluacionRealizada.id);

    return {
      id: evaluacionRealizada.id,
      fecha: evaluacionRealizada.fecha.toISOString().split('T')[0],
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
        puntaje: pr.pregunta.puntaje
      })),
      modificacionPuntaje: evaluacionRealizada.modificacionPuntaje,
      observacion: evaluacionRealizada.observacion,
      nota,
    };
  }

  async findAllEvaluacionesPorTitulo(tituloABuscar: string) {
    const evaluaciones = await this.evaluacionRealizadaRepository.find({
      select: ['id', 'fecha'],
      where: {
        evaluacion: { titulo: tituloABuscar },
      },
      relations: ['evaluacion', 'alumno'],
    });

    const agregarNota = async (evaluacion: EvaluacionRealizada) => {
      const nota = await this.calcularNota(evaluacion.id);
      return { ...evaluacion, nota };
    };

    return Promise.all(evaluaciones.map(agregarNota));
  }

  async findAllEvaluacionesDeUnAlumno(alumnoId: number) {
    
    return (
      await this,
      this.evaluacionRealizadaRepository.find({
        select: ['fecha'],
        where: { alumno: { id: alumnoId } },
      })
    );
  }

  /*async findAllAlumnosPorTituloDeEvaluacion(evaluacionTitulo: string) {
    console.log("alumnos encontrados")
    const evaluacionesRealizadas = await this.evaluacionRealizadaRepository.find({
      where: { evaluacion: { titulo:evaluacionTitulo } },
      relations: ['alumno'],
      select: ['id', 'fecha', 'alumno'],
    });

    console.log(evaluacionesRealizadas);

    return evaluacionesRealizadas.map((evalRealizada) => ({
      id: evalRealizada.id,
      fecha: evalRealizada.fecha.toISOString().split('T')[0], 
      alumno: {
        id: evalRealizada.alumno.id,
        nombre: evalRealizada.alumno.nombre,
        apellido: evalRealizada.alumno.apellido,
        dni: evalRealizada.alumno.dni,
      },
    }));
  }
*/

async findAllAlumnosPorEvaluacion(evaluacionId: number) {
    console.log("alumnos encontrados")
    const evaluacionesRealizadas = await this.evaluacionRealizadaRepository.find({
      where: { evaluacion: { id: evaluacionId} },
      relations: ['alumno', 'evaluacion'],
      select: ['id', 'fecha', 'alumno',],
    });
    const alumnosUnicos = []

    evaluacionesRealizadas.forEach((evalRealizada) => {
      if (!alumnosUnicos.find((alumno) => alumno.alumnoId === evalRealizada.alumno.id)) {
        alumnosUnicos.push({
          alumnoId: evalRealizada.alumno.id,
          nombre: evalRealizada.alumno.nombre,
          apellido: evalRealizada.alumno.apellido,
          dni: evalRealizada.alumno.dni,
        });
      }
    });

    console.log(alumnosUnicos);

    return alumnosUnicos;
  }

  async findAllEvaluacionesPorAlumnoYTitulo(
    alumnoId: number,
    tituloABuscar: string,
  ) {
    return (
      await this,
      this.evaluacionRealizadaRepository.find({
        select: ['fecha'],
        where: {
          alumno: { id: alumnoId },
          evaluacion: { titulo: tituloABuscar },
        },
      })
    );
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

    return `${nota.toFixed(2)}%`;
  }
/*
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

*/

}
