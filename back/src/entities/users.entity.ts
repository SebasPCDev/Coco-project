import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Employees } from './employees.entity';
import { Coworkings } from './coworkings.entity';
import { UserStatus } from 'src/models/userStatus.enum';
import { Role } from 'src/models/roles.enum';
import { Bookings } from './bookings.entity';
import { Reviews } from './reviews.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  lastname: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  identification: string;

  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Exclude()
  @Column({
    name: 'recovery_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  recoveryToken: string;

  @Column({
    name: 'activation_date',
    type: 'timestamptz',
    nullable: true,
  })
  activationDate: Date;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'now()',
  })
  updatedAt: Date;

  @OneToOne(() => Employees, (employee) => employee.user, { nullable: true })
  employee: Employees;

  @ManyToMany(() => Coworkings, (coworking) => coworking.user, {
    nullable: true,
  })
  coworkings: Coworkings[];

  @OneToMany(() => Bookings, (booking) => booking.coworking)
  bookings: Bookings[];

  @OneToMany(() => Reviews, (reviews) => reviews.coworking)
  reviews: Reviews[];
}
