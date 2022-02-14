import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Task } from './task.entity';
import { Meeting } from './meeting.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private conactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
  ) {}

  async seed() {
    const doc = this.employeeRepository.create({ name: 'Mr. Doc' });
    await this.employeeRepository.save(doc);

    const docContactInfo = this.conactInfoRepository.create({
      email: 'doc@gmail.com',
      employee: doc,
    });
    await this.conactInfoRepository.save(docContactInfo);

    const manager = this.employeeRepository.create({
      name: 'Nathan',
      manager: doc,
    });

    const task1 = this.taskRepository.create({ name: 'Hacking people' });
    const task2 = this.taskRepository.create({ name: 'Present to Doc' });
    await this.taskRepository.save([task1, task2]);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepository.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [doc];
    await this.meetingRepository.save(meeting1);

    manager.meetings = [meeting1];

    await this.employeeRepository.save(manager);
  }

  getOneById(id: number): Promise<Employee> {
    return this.employeeRepository.findOne(id, {
      relations: [
        'manager',
        'directReports',
        'contactInfo',
        'tasks',
        'meetings',
      ],
    });
  }

  queryBuilder(id: number): Promise<Employee> {
    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .leftJoinAndSelect('employee.tasks', 'tasks')
      .where('employee.id = :employeeId', { employeeId: id })
      .getOne();
  }

  deleteEmploye(id: number): Promise<DeleteResult> {
    return this.employeeRepository.delete(id);
  }
}
