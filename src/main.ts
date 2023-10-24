import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000);

  if (process.env.SETTING_MODE === 'true') {
    console.warn('!!! Server started in settings mode !!!');
  }
}
bootstrap();
