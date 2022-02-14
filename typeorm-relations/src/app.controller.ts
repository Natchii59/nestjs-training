import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Employee } from './employee.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async seed(): Promise<string> {
    await this.appService.seed();
    return 'Seed complete';
  }

  @Get('one')
  getOne(): Promise<Employee> {
    return this.appService.getOneById(1);
  }
}
