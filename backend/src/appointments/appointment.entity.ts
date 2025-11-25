import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Animal } from '../animals/animal.entity';

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum AppointmentType {
  VISIT = 'visit',
  PICKUP = 'pickup',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Animal, (animal) => animal.appointments)
  animal: Animal;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @Column({ type: 'datetime' })
  date_time: Date;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.SCHEDULED })
  status: AppointmentStatus;

  @Column({ type: 'enum', enum: AppointmentType, default: AppointmentType.VISIT })
  type: AppointmentType;

  @CreateDateColumn()
  created_at: Date;
}