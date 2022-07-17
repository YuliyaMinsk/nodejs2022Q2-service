import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port).then(() => {
    console.log(`
      🚀  Server is running!
      🔉  Listening on port ${port}
      📭  Start work at http://localhost:${port}/user
    `);
  });

}
bootstrap();
