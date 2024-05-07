import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Employees } from './employees.entity';
import { Coworkings } from './coworkings.entity';
import { UserStatus } from 'src/models/userStatus.enum';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  lastname: string;

  @Column({ type: 'varchar', length: 12, unique: true })
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

  @Column({ type: 'varchar', length: 15 })
  role: string;

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
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Employees, (employee) => employee.user, { nullable: true })
  employee: Employees;

  @ManyToMany(() => Coworkings, (coworking) => coworking.user, {
    nullable: true,
  })
  coworkings: Coworkings[];
}
