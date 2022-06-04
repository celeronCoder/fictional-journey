import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'fastify-compress';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('REST API for Todos')
    .setVersion('1.0')
    .addTag('todos')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // compresion
  await app.register(compression, { encodings: ['gzip'] });
  await app.listen(3000);
}
bootstrap();
