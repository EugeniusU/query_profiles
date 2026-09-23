import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { readFileSync } from 'node:fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(process.env.SSL_KEY_PATH!),
    cert: readFileSync(process.env.SSL_CERT_PATH!),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
