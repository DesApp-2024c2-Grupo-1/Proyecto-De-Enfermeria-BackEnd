import { Inject, Injectable } from '@nestjs/common';
import { Evaluacion } from './evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { Docente } from 'src/docente/docente.entity';
import { PutEvaluacionRequestDTO } from './EvaluacionDTO/updateEvaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) {}

  async createEvaluacionYPreguntas(evaluacionyPreguntasData: {
    titulo: string;
    docente: Docente;
    version?: number;
    preguntas: { pregunta: string; puntaje: number }[];
  }) {
    const { titulo, docente, preguntas, version } = evaluacionyPreguntasData;

    const evaluacion = await this.evaluacionRepository.findOne({
      where: { titulo: titulo },
    });

    //Evaluacion
    const nuevaEvaluacion = this.evaluacionRepository.create({
      titulo,
      docente,
      version,
    });
    const evaluacionGuardada =
      await this.evaluacionRepository.save(nuevaEvaluacion);

    //preguntas
    const preguntasGuardadas = await Promise.all(
      preguntas.map(async (preguntaData, index) => {
        const nuevaPregunta = this.preguntaRepository.create({
          pregunta: preguntaData.pregunta,
          puntaje: preguntaData.puntaje,
          evaluacion: evaluacionGuardada,
          orden: index
        });
        return await this.preguntaRepository.save(nuevaPregunta);
      }),
    );

    return {
      evaluacion: evaluacionGuardada,
      preguntas: preguntasGuardadas,
    };
  }

  async findAll() {
    return await this.evaluacionRepository
      .createQueryBuilder('evaluacion')
      .select(['evaluacion.id', 'evaluacion.titulo'])
      .where('evaluacion.bajaFecha IS NULL')
      .orderBy('evaluacion.titulo', 'ASC')
      .getMany();
  }

  async findById(id: number) {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id },
      select: ['id', 'titulo', 'version', 'bajaFecha', 'altaFecha'],
      relations: ['preguntas'],
      order: {
        preguntas: {
          orden: 'ASC',
        },
      },
    });
    return {
      id: evaluacion.id,
      titulo: evaluacion.titulo,
      version: evaluacion.version,
      bajaFecha: new Date(evaluacion.bajaFecha).toLocaleDateString('es-AR'),
      altaFecha: new Date(evaluacion.altaFecha).toLocaleDateString('es-AR'),
      preguntas: evaluacion.preguntas
    }
  }

  async findAllVersionesDeEvaluacionById(id: number) {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id },
    });
    const tituloEncontrado = evaluacion.titulo;
    const evaluaciones = await this.evaluacionRepository.find({
      where: { titulo: tituloEncontrado },
      select: ['id', 'titulo', 'version', 'modFecha'],
    });

    const evaluacionesFormateadas = evaluaciones.map((eva) => ({
      ...eva,
      modFecha: eva.modFecha
        ? new Date(eva.modFecha).toLocaleDateString('es-AR')
        : null,
    }));

    return evaluacionesFormateadas;
  }

  async deshabilitarEvaluacion(id: number) {
    await this.evaluacionRepository.update(id, {
      bajaFecha: new Date(),
      modFecha: new Date(),
    });
  }

  async modificarEvaluacion(
    modificarEvaluacionData: PutEvaluacionRequestDTO,
    id: number,
  ) {
    const { docente, preguntas } = modificarEvaluacionData;
    const evaluacionVieja = await this.evaluacionRepository.findOne({
      where: { id },
      select: ['id', 'titulo', 'version'],
    });

    const { titulo, version } = evaluacionVieja;
    await this.deshabilitarEvaluacion(evaluacionVieja.id);

    //Evaluacion con nueva version
    const nuevaEvaluacion = this.evaluacionRepository.create({
      titulo,
      docente,
      version: version + 1,

    });
    const evaluacionGuardada =
      await this.evaluacionRepository.save(nuevaEvaluacion);

    //preguntas
    const preguntasGuardadas = await Promise.all(
      preguntas.map(async (preguntaData, index) => {
        const nuevaPregunta = this.preguntaRepository.create({
          pregunta: preguntaData.pregunta,
          puntaje: preguntaData.puntaje,
          evaluacion: evaluacionGuardada,
          orden: index
        });
        return await this.preguntaRepository.save(nuevaPregunta);
      }),
    );

    return {
      evaluacion: evaluacionGuardada,
      preguntas: preguntasGuardadas,
    };
  }
}
