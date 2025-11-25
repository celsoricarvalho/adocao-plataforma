import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createAdotante(data: { email: string; password: string; name: string; phone?: string }): Promise<User> {
    const user = this.usersRepository.create({
      ...data,
      role: UserRole.ADOTANTE,
    });
    return this.usersRepository.save(user);
  }

  async createAdmin(data: { email: string; password: string; name: string; phone?: string }): Promise<User> {
    const user = this.usersRepository.create({
      ...data,
      role: UserRole.ADMIN,
    });
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}