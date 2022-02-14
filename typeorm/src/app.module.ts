import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { User } from './user.entity';
import { Pet } from './pet.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([User, Pet]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
