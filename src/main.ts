import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { version, description, name } from '../package.json';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/api-docs', app, document);
  app.use('/swagger.json', (req, res) => {
    res.send(document);
  });

  await app.use(helmet());
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
  );

  await app.listen(process.env.PORT);
  console.log(`Mode ${process.env.NODE_ENV}`);
  console.log(`Application is running on ${process.env.PORT} port`);
  console.log(`OpenAPI docs is available at: http://localhost:${process.env.PORT}/api/api-docs`);
  console.log(`Swagger.json is available at: http://localhost:${process.env.PORT}/swagger.json`);
}
bootstrap();
