import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, AppointmentStatus, AppointmentType } from './appointment.entity';
import { Repository } from 'typeorm';
import { Animal } from '../animals/animal.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAppointment(userId: number, data: { animalId: number; date_time: string; location: string; type: AppointmentType }) {
    const animal = await this.animalsRepository.findOne({ where: { id: data.animalId } });
    if (!animal) throw new NotFoundException('Animal não encontrado');

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const appointment = this.appointmentsRepository.create({
      user,
      animal,
      date_time: new Date(data.date_time),
      location: data.location,
      type: data.type || AppointmentType.VISIT,
      status: AppointmentStatus.SCHEDULED,
    });
    return this.appointmentsRepository.save(appointment);
  }

  findByUser(userId: number) {
    return this.appointmentsRepository.find({
      where: { user: { id: userId } },
      relations: ['animal'],
      order: { created_at: 'DESC' },
    });
  }

  findAll() {
    return this.appointmentsRepository.find({
      relations: ['animal', 'user'],
      order: { created_at: 'DESC' },
    });
  }

  async updateStatus(id: number, status: AppointmentStatus) {
    await this.appointmentsRepository.update(id, { status });
    return this.appointmentsRepository.findOne({ where: { id }, relations: ['animal', 'user'] });
  }
}