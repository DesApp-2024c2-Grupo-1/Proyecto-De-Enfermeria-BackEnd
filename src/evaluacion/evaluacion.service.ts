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
    docente: DeepPartial<Docente>;
    version?: number;
    preguntas: { pregunta: string; puntaje: number }[];
  }) {
    const { titulo, docente, preguntas, version } = evaluacionyPreguntasData;

    const evaluacion = await this.evaluacionRepository.findOne({where: {titulo: titulo}})

    //if (evaluacion) {
    //  throw Error("Ya existe una evaluacion con el titulo ingresado")
    //}

    //if (evaluacion.bajaFecha){
    //  throw new Error("Ya existe una evaluacion habilitada con el titulo ingresado");
    //}

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
      preguntas.map(async (preguntaData) => {
        const nuevaPregunta = this.preguntaRepository.create({
          pregunta: preguntaData.pregunta,
          puntaje: preguntaData.puntaje,
          evaluacion: evaluacionGuardada,
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
    //const evaluaciones = await this.evaluacionRepository.find({
    //  where: {
    //  bajaFecha: null,
    //},
    //  select: ['id', 'titulo'],
    //});

    //return evaluaciones;
    return await this.evaluacionRepository
      .createQueryBuilder('evaluacion')
      .select(['evaluacion.id', 'evaluacion.titulo'])
      .where('evaluacion.bajaFecha IS NULL')
      .getMany();
  }

  async findById(id: number) {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id },
      select: ['id', 'titulo', 'version', 'bajaFecha'],
      relations: ['preguntas'],
    });

    return evaluacion;
  }

  async findByTitulo(tituloABuscar: string) {
    return await this.evaluacionRepository.findOne({
      where: { titulo: tituloABuscar },
    });
  }

  async deshabilitarEvaluacion(id: number) {
    //const evaluacion = await this.evaluacionRepository.findOne({where: {id}})
    //if (evaluacion.bajaFecha != null){
    //  throw new Error("La evaluacion ya esta deshabilitada"); 
    //} 

   await this.evaluacionRepository.update(id, {
      bajaFecha: new Date(),
      modFecha: new Date()
    });
  }

  //testear esto
  async modificarEvaluacion(modificarEvaluacionData: PutEvaluacionRequestDTO, id: number){
    const { docente, preguntas } = modificarEvaluacionData;
    const evaluacionVieja = await this.evaluacionRepository.findOne({
      where: { id }, 
      select: ['id', 'titulo', 'version'],
    })

    const { titulo, version } = evaluacionVieja;
    await this.deshabilitarEvaluacion(evaluacionVieja.id)

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
      preguntas.map(async (preguntaData) => {
        const nuevaPregunta = this.preguntaRepository.create({
          pregunta: preguntaData.pregunta,
          puntaje: preguntaData.puntaje,
          evaluacion: evaluacionGuardada,
        });
        return await this.preguntaRepository.save(nuevaPregunta);
      }),
    );

    return {
      evaluacion: evaluacionGuardada,
      preguntas: preguntasGuardadas,
    };
  }

  async create(evaluacionData: Evaluacion) {
    const nuevoEvaluacion = this.evaluacionRepository.create(evaluacionData);
    return await this.evaluacionRepository.save(nuevoEvaluacion);
  }

  /*

      async delete(id: number) {
        const salida = await this.evaluacionRepository.delete(id);
      return salida
      }
      
      async modifyById(id: number, evaluacionData: Evaluacion) {
        const evaluacion = await this.evaluacionRepository.findOne({where: {id}})
      Object.assign(evaluacion, evaluacionData)
      this.evaluacionRepository.save(evaluacion)
          
      }

      */
}
