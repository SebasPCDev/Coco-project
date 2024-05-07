import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Users } from './users.entity';
import { Company } from './companies.entity';

@Entity('employees')
export class Employees {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  passes: number;

  @Column({ name: 'passes_available', type: 'int' })
  passesAvailable: number;

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

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => Users, (user) => user.employee)
  @JoinColumn()
  user: Users;
}
