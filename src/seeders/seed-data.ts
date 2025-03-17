import { AppDataSource } from '../db/data-source';
import { Repository } from 'typeorm';
import { Alumno } from '../alumno/alumno.entity';
import { Docente } from '../docente/docente.entity';
import { Evaluacion } from '../evaluacion/evaluacion.entity';
import { EvaluacionRealizada } from '../evaluacion-realizada/evaluacion-realizada.entity';
import { Pregunta } from '../pregunta/pregunta.entity';

async function seedDatabase() {
    // Repositorios
    const alumnoRepository: Repository<Alumno> = AppDataSource.getRepository(Alumno);
    const docenteRepository: Repository<Docente> = AppDataSource.getRepository(Docente);
    const evaluacionRepository: Repository<Evaluacion> = AppDataSource.getRepository(Evaluacion);
    const preguntaRepository: Repository<Pregunta> = AppDataSource.getRepository(Pregunta);
    const evaluacionRealizadaRepository: Repository<EvaluacionRealizada> = AppDataSource.getRepository(EvaluacionRealizada);

    //Agregar datos iniciales para alumnos
    const existingAlumnos = await alumnoRepository.count();
    if (existingAlumnos === 0) {
        const alumnos = [
        { nombre: 'Pablo', apellido: 'Israelsky', dni: 12312312, email: 'pabloisraelsky@gmail.com' },
        { nombre: 'Maia', apellido: 'Barrionuevo', dni: 32132131, email: 'maiabarrionuevo@gmail.com' },
        { nombre: 'Maximiliano', apellido: 'Almada', dni: 45645645, email: 'maxialmada@gmail.com' },
        { nombre: 'Priscila', apellido: 'Jofre Gil', dni: 65465465, email: 'priscilajofregil@gmail.com' },
        { nombre: 'Elizabeth', apellido: 'Albornoz', dni: 11111111, email: 'elialbornoz@gmail.com' },
        { nombre: 'Franco', apellido: 'Orellana', dni: 22222222, email: 'franorellana@gmail.com' },
        { nombre: 'Claudia', apellido: 'Gil', dni: 33333333, email: 'claudiagil@gmail.com' },
        { nombre: 'Karen', apellido: 'Jofre', dni: 44444444, email: 'karenjofre@gmail.com' },
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
        { titulo: 'Determinar altura uterina', docente: { id: 2 } },
        { titulo: 'Lavado de Manos', docente: { id: 1 } },
        { titulo: 'Colocacion de elementos de seguridad', docente: { id: 1 } },
        { titulo: 'Control de signos vitales', docente: { id: 3 } },
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

            { pregunta: 'Se retira relojes, anillos y pulseras', puntaje: 1, evaluacion: { id: 2 } },
            { pregunta: 'Abre la llave de agua y humedece sus manos', puntaje: 1, evaluacion: { id: 2 } },
            { pregunta: 'Aplica jabón líquido en la palma de la mano', puntaje: 1, evaluacion: { id: 1 } },
            { pregunta: 'Frota la palma de la mano derecha contra el dorso de la mano izquierda entrelazando los dedos y viceversa', puntaje: 1 , evaluacion: { id: 2 } },
            { pregunta: 'Frota la palma de las manos entrelazando los dedos entre sí.', puntaje: 1 , evaluacion: { id: 2 } },
            { pregunta: 'Frota el dorso de los dedos de una mano con la palma de la mano opuesta agarrándose los dedos.', puntaje: 1 , evaluacion: { id: 2 } },
            { pregunta: 'Frota con un movimiento de rotación el pulgar izquierdo atrapandolo con la palma de la mano derecha y viceversa.', puntaje: 1 , evaluacion: { id: 2 } },
            { pregunta: 'Frota la punta de los dedos de la mano derecha contra la palma de la mano izquierda y viceversa.', puntaje: 1 , evaluacion: { id: 2 } },
            { pregunta: 'Respeta el tiempo establecido del procedimiento (10 a 15 segundos).', puntaje: 1 , evaluacion: { id: 2 } },
            { pregunta: 'Reconoce y fundamenta los 5 momentos del lavado de manos.', puntaje: 1 , evaluacion: { id: 2 } },

            { pregunta: 'Realiza lavado de manos según Técnica', puntaje: 1, evaluacion: { id: 3 } },
            { pregunta: 'Informa al sujeto de atención el procedimiento a realizar.', puntaje: 1, evaluacion: { id: 3 } },
            { pregunta: 'Colocación de camisolín. Despliega hacia adelante no dejando que toque ninguna zona contaminada', puntaje: 2, evaluacion: { id: 3 } },
            { pregunta: 'Deslizar los brazos y las manos a través de los puños.', puntaje: 4, evaluacion: { id: 3 } },
            { pregunta: 'Ajustar los lazos del cuello para mantener el camisolin colocado.', puntaje: 2, evaluacion: { id: 3 } },
            { pregunta: 'Estirar el camisolin hacia atrás todo lo posible y ajustar los cordones del mismo o el cinturón en la parte posterior.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Colocación de Barbijo quirúrgico. Localizar el borde superior del barbijo, suele tener una tira metálica estrecha a lo largo del borde.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Mantener el barbijo por las dos tiras o asas superiores. Colocar el borde superior del barbijo sobre el puente de la nariz y atar los cordones superiores en la parte posterior de la cabeza o asegurar las asas alrededor de los pabellones auriculares.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Ajustar el borde superior de la mascarilla por debajo del mismo.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Colocarse guantes desechables o manoplas .', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Estirar los guantes para cubrir las mangas del camisón.', puntaje: 1, evaluacion: { id: 3 } },
            { pregunta: 'Colocarse botas o cubre calzado. Ajustando las tiras de manera tal que no deslice.', puntaje: 1, evaluacion: { id: 3 } },
            { pregunta: 'Para retirar el EPP sucio en la puerta de la habitación. Aflojar los cordones del camisolin de la zona del cuello y retirar la fijación del cordón de la zona de la cintura.', puntaje: 2, evaluacion: { id: 3 } },
            { pregunta: 'Retirar la cofia estirando hacia arriba, inclinando la cabeza hacia abajo. Descartar en bolsa roja.', puntaje: 4, evaluacion: { id: 3 } },
            { pregunta: 'Retirar Botas o cubrecalzado de a uno por vez. Descartando en bolsa roja', puntaje: 2, evaluacion: { id: 3 } },
            { pregunta: 'Retirar los guantes en conjunto con el camisolín.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Para retirar el EPP sucio fuera de la habitación. Retiro de antiparras. Teniendo en cuenta no tocar los ojos. Colocar las antiparras en un recipiente para su posterior desinfección.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Retiro de antiparras. Teniendo en cuenta no tocar los ojos. Colocar las antiparras en un recipiente para su posterior desinfección.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Retiro el barbijo sacándolo en primera instancia del cordón que se encuentra en la zona de la nuca, luego sacar el cordón de la parte posterior de la cabeza. Desechar en bolsa roja.', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Realizar lavado de manos', puntaje: 1 , evaluacion: { id: 3 } },
            { pregunta: 'Registrar en hoja de enfermería', puntaje: 1 , evaluacion: { id: 3 } },

            { pregunta: 'Reúne el material', puntaje: 1, evaluacion: { id: 4 } },
            { pregunta: 'Se presenta e identifica ante el paciente e informa el procedimiento a realizar.', puntaje: 1, evaluacion: { id: 4 } },
            { pregunta: 'Seca la axila del paciente', puntaje: 2, evaluacion: { id: 4 } },
            { pregunta: 'Controla las condiciones del termómetro y lo enciende', puntaje: 4, evaluacion: { id: 4 } },
            { pregunta: 'Coloca el termómetro dirigiendo el bulbo en la cavidad axilar comprimiendo el brazo hacia el cuerpo', puntaje: 2, evaluacion: { id: 4 } },
            { pregunta: 'Retira el termómetro y lee el resultado', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Realiza la antisepsia del termómetro y lo guarda', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Presiona suavemente con los dedos índice medio y anular sobre la arteria radial', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Controla frecuencias y características con el reloj en un minuto', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Controla la frecuencia respiratoria y características en un minuto sin avisar al paciente', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Coloca al paciente en posición cómoda con el brazo ubicado a la altura del corazón', puntaje: 1, evaluacion: { id: 4 } },
            { pregunta: 'Palpa la arteria braquial y coloca el manguito', puntaje: 1, evaluacion: { id: 4 } },
            { pregunta: 'Ubica al manómetro para que quede visible y el sistema de tubos no esté obstruido', puntaje: 2, evaluacion: { id: 4 } },
            { pregunta: 'Controla que la válvula de la pera de caucho esté cerrada', puntaje: 4, evaluacion: { id: 4 } },
            { pregunta: 'Palpa el pulso radial e insufla la cámara hasta 70 mmhg', puntaje: 2, evaluacion: { id: 4 } },
            { pregunta: 'Incrementa de 10 en10 hasta que deja de percibir el pulso y desinsufla la cámara de manera gradual', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Se coloca las olivas del estetoscopio', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Coloca la campana del estetoscopio sobre la arteria braquial en la parte media antecubital por debajo de la parte media del manguito', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Comienza a insuflar y lee en el manómetro el valor en el que se escucha el primer ruido de Korotkoff', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Comienza la descompresión gradual a través de la válvula escucha cómo se atenúan los ruidos hasta desaparecer y desinsufla completamente el manguito', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Retira el manguito y lo acondiciona', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Realiza lavado de manos según técnica', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Registra de forma completa los datos obtenidos del procedimiento realizado', puntaje: 1 , evaluacion: { id: 4 } },
            { pregunta: 'Toma la bandeja y se retira de la habitación', puntaje: 1 , evaluacion: { id: 4 } },
        ];
        await preguntaRepository.save(preguntas);
        console.log('Preguntas iniciales insertadas.');
    }
    const existingEvaluacionesRealizadas = await evaluacionRealizadaRepository.count();
    if (existingEvaluacionesRealizadas === 0) {
        const evaluaciones = [
        { titulo: 'Determinar altura uterina', docente: { id: 2 } },
        { titulo: 'Lavado de Manos', docente: { id: 1 } },
        { titulo: 'Colocacion de elementos de seguridad', docente: { id: 1 } },
        { titulo: 'Control de signos vitales', docente: { id: 3 } },
        ];
    await evaluacionRepository.save(evaluaciones);
    }
}

export default seedDatabase;