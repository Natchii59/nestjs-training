import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersResolver } from './users/users.resolver';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}
