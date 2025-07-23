import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import seedDatabase from './seeders/seed-data';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })

  const configSwagger = new DocumentBuilder()
    .setTitle('API Registros de Evaluacion de Enfermeria')
    .setDescription('Documentacion de la API de registros de evaluacion')
    //.addBearerAuth() //Si despues incluimos JWT deberiamos poner esto porque le daria el soporte visual para el token
    .setVersion('1.0')
    .build()

    const document = SwaggerModule.createDocument(app, configSwagger)
    SwaggerModule.setup('api', app, document)


  await seedDatabase();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
