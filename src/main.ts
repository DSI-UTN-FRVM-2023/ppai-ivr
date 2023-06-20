import { NestFactory } from '@nestjs/core';
import { DominioModule } from './dominio.module';

async function bootstrap() {
  const app = await NestFactory.create(DominioModule);
  await app.listen(3000);
}
bootstrap();
