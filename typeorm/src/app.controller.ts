import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async seed(): Promise<User> {
    const user = await this.appService.createUser('Nathan');
    await this.appService.createPet('TouTou', user);

    return await this.appService.updateUser(user.id, 'New name');
  }

  @Get('all')
  all(): Promise<User[]> {
    return this.appService.getAll();
  }

  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.appService.deleteUser(id);
  }
}
