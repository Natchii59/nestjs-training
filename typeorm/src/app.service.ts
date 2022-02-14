import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['pets'],
    }); // SELECT * FROM user JOIN pets;
  }

  async getOneById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOne(id); // SELECT * FROM user WHERE id = '$id';
    } catch (err) {
      throw err;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.usersRepository.create({
      name,
    });
    // const newUser = new User();
    // newUser.name = name;

    return this.usersRepository.save(newUser); // INSERT
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);

    return this.usersRepository.save({
      ...user,
      name,
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);

    return this.usersRepository.remove(user);
  }

  async createPet(name: string, owner: User): Promise<Pet> {
    const newPet = this.petsRepository.create({ owner, name });

    return this.petsRepository.save(newPet);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
