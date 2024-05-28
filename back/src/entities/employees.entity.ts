import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Users } from './users.entity';
import { Companies } from './companies.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('employees')
export class Employees {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  passes: number;

  @Column({ name: 'passes_available', type: 'int' })
  passesAvailable: number;

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

  @ManyToOne(() => Companies, (company) => company.employees, {
    nullable: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @OneToOne(() => Users, (user) => user.employee)
  @JoinColumn()
  user: Users;
}
