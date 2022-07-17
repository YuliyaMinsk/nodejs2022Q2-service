import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { cwd } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(port).then(() => {
    console.log(`
      🚀  Server is running!
      🔉  Listening on port ${port}
      📭  Start work at http://localhost:${port}/user
    `);
  });
}
bootstrap();
