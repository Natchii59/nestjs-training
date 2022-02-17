import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.use(passport.initialize());

  await app.listen(3000);
})();
