import { Exclude } from 'class-transformer';
import { BookingStatus } from 'src/models/bookingStatus';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { Coworkings } from './coworkings.entity';

@Entity({ name: 'bookings' })
export class Bookings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'timestamptz', name: 'reservation_date', nullable: true })
  reservationDate: Date;

  @Column({ type: 'time', name: 'reservation_time', nullable: true })
  reservationTime: Date;

  @Column({ type: 'timestamptz', name: 'booking_date', nullable: true })
  date: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relacion hacia users 
  @ManyToOne(() => Users, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: Users

  // Relacion hacia Coworkings
  @ManyToOne(() => Coworkings, (coworking) => coworking.bookings)
  @JoinColumn({ name: 'coworking_id' })
  coworking: Coworkings

}
