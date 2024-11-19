import { AppDataSource } from '../db/data-source';
import { Repository } from 'typeorm';
import { Alumno } from '../alumno/alumno.entity';
import { Docente } from '../docente/docente.entity';
import { Evaluacion } from '../evaluacion/evaluacion.entity';
import { Pregunta } from '../pregunta/pregunta.entity';

async function seedDatabase() {
    // Repositorios
    const alumnoRepository: Repository<Alumno> = AppDataSource.getRepository(Alumno);
    const docenteRepository: Repository<Docente> = AppDataSource.getRepository(Docente);
    const evaluacionRepository: Repository<Evaluacion> = AppDataSource.getRepository(Evaluacion);
    const preguntaRepository: Repository<Pregunta> = AppDataSource.getRepository(Pregunta);

    //Agregar datos iniciales para alumnos
    const existingAlumnos = await alumnoRepository.count();
    if (existingAlumnos === 0) {
        const alumnos = [
        { nombre: 'Pablo', apellido: 'Israelsky', dni: 123123123, email: 'pabloisraelsky@gmail.com' },
        { nombre: 'Maia', apellido: 'Barrionuevo', dni: 321321312, email: 'maiabarrionuevo@gmail.com' },
        { nombre: 'Maximiliano', apellido: 'Almada', dni: 456456456, email: 'maxialmada@gmail.com' },
        { nombre: 'Priscila', apellido: 'Jofre Gil', dni: 654654654, email: 'priscilajofregil@gmail.com' },

    ];
    await alumnoRepository.save(alumnos);
    }


    // Agregar datos iniciales para docentes
    const existingDocentes = await docenteRepository.count();
    if (existingDocentes === 0) {
        const docentes = [
        { nombre: 'Carlos', apellido: 'Lombardi' , dni: 45454545, email: 'carloslombardi@gmail.com', password: 'asdf1234'},
        { nombre: 'Cristian', apellido: 'Schiffino', dni: 34343434, email: 'cristianschiffino@gmail.com', password: 'asdf1234' },
        { nombre: 'Hernan',apellido: 'Guzman', dni: 35353535 , email: 'hernanguzman@gmail.com', password: 'asdf1234'},
        { nombre: 'Patricio', apellido: 'Contreras', dni: 24242424, email: 'patriciocontreras@gmail.com', password: 'asdf1234'},
        ];
    await docenteRepository.save(docentes);
    }

    // Agregar datos iniciales para evaluaciones
    const existingEvaluaciones = await evaluacionRepository.count();
    if (existingEvaluaciones === 0) {
        const evaluaciones = [
        { titulo: 'Determinar altura uterina', exigencia: '60%', docente: { id: 2 } },
        { titulo: 'Lavado de Manos', exigencia: '60%', docente: { id: 1 } },
        { titulo: 'Colocacion de elementos de seguridad', exigencia: '60%', docente: { id: 1 } },
        { titulo: 'Control de signos vitales', exigencia: '60%', docente: { id: 3 } },
        ];
    await evaluacionRepository.save(evaluaciones);
    }

    // Agregar datos iniciales para preguntas
    const existingPreguntas = await preguntaRepository.count();
    if (existingPreguntas === 0) {
        const preguntas = [
            { pregunta: 'Disponer de los materiales necesarios para realizar el procedimiento. Cinta métrica', puntaje: 1, evaluacion: { id: 1 } },
            { pregunta: 'Colocar a la persona gestante en posición decúbito dorsal', puntaje: 1, evaluacion: { id: 1 } },
            { pregunta: 'Colocar la cinta métrica en el borde superior del pubis determinando la longitud uterina', puntaje: 2, evaluacion: { id: 1 } },
            { pregunta: 'Sostener la cinta con el dedo índice de su mano derecha y luego deslice lamano izquierda junto con la cinta por todo el abdomen hasta el borde superior del fondo del útero', puntaje: 4, evaluacion: { id: 1 } },
            { pregunta: 'Determinar la altura uterina. Registrar', puntaje: 2, evaluacion: { id: 1 } },
            { pregunta: 'Reúne el material ', puntaje: 1 , evaluacion: { id: 2 } },
        ];
        await preguntaRepository.save(preguntas);
        console.log('Preguntas iniciales insertadas.');
    }
}

export default seedDatabase;