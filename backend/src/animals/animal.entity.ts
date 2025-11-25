import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';
import { Appointment } from '../appointments/appointment.entity';

export enum AnimalStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  ADOPTED = 'adopted',
}

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column({ nullable: true })
  breed: string;

  @Column()
  age: number;

  @Column()
  size: string;

  @Column()
  gender: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: AnimalStatus,
    default: AnimalStatus.AVAILABLE,
  })
  status: AnimalStatus;

  @Column({ name: 'main_photo_url', nullable: true })
  mainPhotoUrl: string;

  @Column({ name: 'photo_urls', type: 'json', nullable: true })
  photoUrls: string[];

  @OneToMany(() => Reservation, (reservation) => reservation.animal)
  reservations: Reservation[];

  @OneToMany(() => Appointment, (appointment) => appointment.animal)
  appointments: Appointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}