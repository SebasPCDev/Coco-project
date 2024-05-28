import { Exclude } from 'class-transformer';
import { BookingStatus } from 'src/models/bookingStatus';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Coworkings } from './coworkings.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'bookings' })
export class Bookings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'timestamptz', name: 'reservation_date', nullable: true })
  reservationDate: Date;

  @Column({ type: 'time', name: 'reservation_time', nullable: true })
  reservationTime: Date;

  @Column({
    type: 'timestamptz',
    name: 'booking_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({ type: 'varchar', nullable: true, name: 'confirm_phrase' })
  confirmPhrase: string;

  @Column({ type: 'boolean', default: false, name: 'confirm_user' })
  confirmUser: boolean;

  @Column({ type: 'boolean', default: false, name: 'confirm_coworking' })
  confirmCoworking: boolean;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ type: 'varchar', nullable: true })
  observation: string;

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @ApiHideProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'now()',
  })
  updatedAt: Date;

  // Relacion hacia users
  @ManyToOne(() => Users, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  // Relacion hacia Coworkings
  @ManyToOne(() => Coworkings, (coworking) => coworking.bookings)
  @JoinColumn({ name: 'coworking_id' })
  coworking: Coworkings;
}
