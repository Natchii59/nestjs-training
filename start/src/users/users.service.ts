// Generate with CLI : nest generate controller users

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'Nathan' },
    { id: 1, name: 'Léa' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };

    this.users.push(newUser);

    return newUser;
  }
}
