import { AppDataSource } from '../db/data-source';
import { Repository } from 'typeorm';
import { Alumno } from '../alumno/alumno.entity';
import { Docente } from '../docente/docente.entity';
import { Evaluacion } from '../evaluacion/evaluacion.entity';
import { EvaluacionRealizada } from '../evaluacion-realizada/evaluacion-realizada.entity';
import { Pregunta } from '../pregunta/pregunta.entity';
import { LugarEvaluacion } from 'src/lugar-evaluacion/lugar-evaluacion.entity';
import { DocenteService } from 'src/docente/docente.service';

async function seedDatabase() {
  // Repositorios
  const alumnoRepository: Repository<Alumno> =
    AppDataSource.getRepository(Alumno);
  const docenteRepository: Repository<Docente> =
    AppDataSource.getRepository(Docente);
  const evaluacionRepository: Repository<Evaluacion> =
    AppDataSource.getRepository(Evaluacion);
  const preguntaRepository: Repository<Pregunta> =
    AppDataSource.getRepository(Pregunta);
  const evaluacionRealizadaRepository: Repository<EvaluacionRealizada> =
    AppDataSource.getRepository(EvaluacionRealizada);
  const lugarEvaluacionRepository: Repository<LugarEvaluacion> =
    AppDataSource.getRepository(LugarEvaluacion);

  //Crear lugares de evaluacion
  const existingLugares = await lugarEvaluacionRepository.count();
  if (existingLugares === 0) {
    const lugares = [
      {
        nombre: 'Campo Practico',
      },
      {
        nombre: 'Centro de Simulacion',
      },
    ];
    await lugarEvaluacionRepository.save(lugares);
  }

  //Agregar datos iniciales para alumnos
  const existingAlumnos = await alumnoRepository.count();
  if (existingAlumnos === 0) {
    const alumnos = [
      {
        nombre: 'Pablo',
        apellido: 'Israelsky',
        dni: 12312312,
        email: 'pabloisraelsky@gmail.com',
      },
      {
        nombre: 'Maia',
        apellido: 'Barrionuevo',
        dni: 32132131,
        email: 'maiabarrionuevo@gmail.com',
      },
      {
        nombre: 'Maximiliano',
        apellido: 'Almada',
        dni: 45645645,
        email: 'maxialmada@gmail.com',
      },
      {
        nombre: 'Priscila',
        apellido: 'Jofre Gil',
        dni: 65465465,
        email: 'priscilajofregil@gmail.com',
      },
      {
        nombre: 'Elizabeth',
        apellido: 'Albornoz',
        dni: 11111111,
        email: 'elialbornoz@gmail.com',
      },
      {
        nombre: 'Franco',
        apellido: 'Orellana',
        dni: 22222222,
        email: 'franorellana@gmail.com',
      },
      {
        nombre: 'Claudia',
        apellido: 'Gil',
        dni: 33333333,
        email: 'claudiagil@gmail.com',
      },
      {
        nombre: 'Karen',
        apellido: 'Jofre',
        dni: 44444444,
        email: 'karenjofre@gmail.com',
      },
    ];
    await alumnoRepository.save(alumnos);
  }

  const docenteService = new DocenteService(docenteRepository);
  const existingDocentes = await docenteRepository.count();
  if (existingDocentes === 0) {
    docenteService.create({
      nombre: 'Docente',
      apellido: 'Admin',
      dni: 12345678,
      email: 'docente.admmin@mail.com',
      password: 'asdf1234',
    });
  }
}

export default seedDatabase;
