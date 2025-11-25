import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Animal } from './animals/animal.entity';
import { Reservation } from './reservations/reservation.entity';
import { Appointment } from './appointments/appointment.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AnimalsModule } from './animals/animals.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'adocao_animais',
      entities: [User, Animal, Reservation, Appointment],
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    AnimalsModule,
    ReservationsModule,
    AppointmentsModule
  ]
})
export class AppModule {}