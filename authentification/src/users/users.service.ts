import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'Natchi',
      password: 'P@ssw0rd',
    },
  ];

  findOneByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
